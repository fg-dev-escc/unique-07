import React, { useState, useRef, useCallback } from 'react';

import fileService from '../../services/fileService';

export const ImageUploader = ({
  articuloID,
  usuarioID,
  maxFiles = 10,
  maxSizeMB = 10,
  onUploadComplete,
  onUploadProgress,
  onError,
  disabled = false,
  showPreview = true,
  allowReorder = true,
  compressImages = true
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = useCallback(async (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = [];
    const errors = [];

    // Validate each file
    for (const file of fileArray) {
      const validation = fileService.validateImageFile(file, maxSizeMB);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push({ file: file.name, message: validation.message });
      }
    }

    // Check total file count
    if (files.length + validFiles.length > maxFiles) {
      errors.push({ 
        message: `Máximo ${maxFiles} imágenes permitidas. Seleccionando solo las primeras ${maxFiles - files.length}` 
      });
      validFiles.splice(maxFiles - files.length);
    }

    // Show errors
    if (errors.length > 0 && onError) {
      onError(errors);
    }

    if (validFiles.length === 0) return;

    // Process files and create previews
    const processedFiles = [];
    const newPreviews = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      let processedFile = file;

      // Compress image if enabled
      if (compressImages && file.size > 1024 * 1024) { // Compress files larger than 1MB
        try {
          processedFile = await fileService.compressImage(file);
        } catch (error) {
          console.warn('Image compression failed, using original:', error);
        }
      }

      processedFiles.push(processedFile);

      // Create preview
      if (showPreview) {
        const previewUrl = URL.createObjectURL(processedFile);
        newPreviews.push({
          id: Date.now() + i,
          file: processedFile,
          url: previewUrl,
          name: file.name,
          size: processedFile.size,
          isMain: files.length === 0 && i === 0 // First image is main
        });
      }
    }

    setFiles(prev => [...prev, ...processedFiles]);
    if (showPreview) {
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  }, [files.length, maxFiles, maxSizeMB, onError, showPreview, compressImages]);

  // Handle drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  }, [disabled, handleFileSelect]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    if (disabled) return;
    
    const selectedFiles = e.target.files;
    handleFileSelect(selectedFiles);
    
    // Clear input
    e.target.value = '';
  }, [disabled, handleFileSelect]);

  // Remove file
  const removeFile = useCallback((index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Clean up preview URLs
    if (previews[index]) {
      URL.revokeObjectURL(previews[index].url);
    }

    setFiles(newFiles);
    setPreviews(newPreviews);

    // Update main image if removed
    if (newPreviews.length > 0 && index === 0) {
      newPreviews[0].isMain = true;
      setPreviews([...newPreviews]);
    }
  }, [files, previews]);

  // Set main image
  const setMainImage = useCallback((index) => {
    if (!allowReorder) return;

    const newPreviews = previews.map((preview, i) => ({
      ...preview,
      isMain: i === index
    }));

    setPreviews(newPreviews);

    // Reorder files array to match
    const newFiles = [...files];
    const [mainFile] = newFiles.splice(index, 1);
    newFiles.unshift(mainFile);
    setFiles(newFiles);
  }, [previews, files, allowReorder]);

  // Upload all files
  const uploadFiles = useCallback(async () => {
    if (!articuloID || !usuarioID || files.length === 0) {
      if (onError) {
        onError([{ message: 'Faltan parámetros requeridos para la subida' }]);
      }
      return;
    }

    setUploading(true);
    
    try {
      const result = await fileService.uploadMultipleImages(
        articuloID,
        files,
        usuarioID,
        (progress) => {
          setUploadProgress(progress);
          if (onUploadProgress) {
            onUploadProgress(progress);
          }
        }
      );

      if (result.success) {
        // Clear files and previews on success
        previews.forEach(preview => URL.revokeObjectURL(preview.url));
        setFiles([]);
        setPreviews([]);
        setUploadProgress({});
        
        if (onUploadComplete) {
          onUploadComplete(result);
        }
      } else {
        if (onError) {
          onError(result.results.filter(r => !r.success));
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (onError) {
        onError([{ message: 'Error durante la subida' }]);
      }
    } finally {
      setUploading(false);
    }
  }, [articuloID, usuarioID, files, previews, onUploadComplete, onUploadProgress, onError]);

  // Clear all files
  const clearFiles = useCallback(() => {
    previews.forEach(preview => URL.revokeObjectURL(preview.url));
    setFiles([]);
    setPreviews([]);
    setUploadProgress({});
  }, [previews]);

  return (
    <div className="image-uploader">
      {/* Drop Zone */}
      <div
        className={`upload-drop-zone border-2 border-dashed rounded p-4 text-center position-relative ${
          dragOver ? 'border-primary bg-light' : 'border-secondary'
        } ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          className="d-none"
          disabled={disabled}
        />

        <div className="upload-content">
          <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
          <h5>Subir Imágenes</h5>
          <p className="text-muted mb-2">
            Arrastra las imágenes aquí o haz clic para seleccionar
          </p>
          <small className="text-muted">
            Máximo {maxFiles} imágenes, {maxSizeMB}MB cada una
          </small>
        </div>

        {uploading && (
          <div className="upload-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
            <div className="text-center">
              <div className="spinner-border text-primary mb-2" role="status"></div>
              <p className="mb-0">
                Subiendo {uploadProgress.current || 0} de {uploadProgress.total || 0}
              </p>
              {uploadProgress.fileName && (
                <small className="text-muted">{uploadProgress.fileName}</small>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preview Grid */}
      {showPreview && previews.length > 0 && (
        <div className="preview-grid mt-3">
          <div className="row g-2">
            {previews.map((preview, index) => (
              <div key={preview.id} className="col-md-3 col-sm-4 col-6">
                <div className={`preview-card position-relative border rounded overflow-hidden ${preview.isMain ? 'border-primary border-2' : ''}`}>
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-100"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  
                  {/* Main badge */}
                  {preview.isMain && (
                    <span className="position-absolute top-0 start-0 badge bg-primary m-1">
                      <i className="fas fa-star me-1"></i>
                      Principal
                    </span>
                  )}

                  {/* Actions */}
                  <div className="preview-actions position-absolute top-0 end-0 m-1">
                    {allowReorder && !preview.isMain && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-light me-1"
                        onClick={() => setMainImage(index)}
                        title="Establecer como principal"
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    )}
                    
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFile(index)}
                      title="Eliminar"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  {/* File info */}
                  <div className="preview-info position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white p-1">
                    <small className="d-block text-truncate">{preview.name}</small>
                    <small className="text-muted">{fileService.formatFileSize(preview.size)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {files.length > 0 && (
        <div className="upload-actions mt-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={uploadFiles}
            disabled={uploading || disabled}
          >
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Subiendo...
              </>
            ) : (
              <>
                <i className="fas fa-upload me-2"></i>
                Subir {files.length} imagen{files.length !== 1 ? 'es' : ''}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={clearFiles}
            disabled={uploading}
          >
            <i className="fas fa-times me-2"></i>
            Limpiar
          </button>
        </div>
      )}

      {/* Progress Info */}
      {uploading && uploadProgress.percentage && (
        <div className="upload-progress mt-2">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${uploadProgress.percentage}%` }}
              aria-valuenow={uploadProgress.percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted mt-1 d-block">
            {uploadProgress.percentage}% completado
          </small>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;