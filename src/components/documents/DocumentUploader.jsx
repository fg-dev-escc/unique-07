import React, { useState, useRef } from 'react';

import fileService from '../../services/fileService';

export const DocumentUploader = ({
  onUploadComplete,
  onError,
  uploadType = 'general', // 'general', 'comprador', 'garantia', 'pago', 'cliente'
  maxSizeMB = 25,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
  disabled = false,
  className = '',
  // Props específicos por tipo
  articuloID = null,
  compradorID = null,
  clienteID = null,
  ordenPagoID = null,
  usuarioID = null,
  monto = null,
  tipo = null
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = async (files) => {
    const fileArray = Array.from(files);
    
    if (fileArray.length === 0) return;

    // For single file upload, take only the first file
    const file = fileArray[0];

    // Validate file
    const validation = fileService.validateDocumentFile(file, maxSizeMB);
    if (!validation.valid) {
      if (onError) {
        onError([{ file: file.name, message: validation.message }]);
      }
      return;
    }

    await uploadFile(file);
  };

  // Upload file based on type
  const uploadFile = async (file) => {
    setUploading(true);

    try {
      let response;
      const fileName = file.name.split('.')[0]; // Get name without extension

      switch (uploadType) {
        case 'articulo':
          response = await fileService.uploadArticuloDocument(
            articuloID,
            file,
            fileName,
            usuarioID,
            tipo || 'DOCUMENTO'
          );
          break;

        case 'comprador':
          response = await fileService.uploadCompradorDocument(
            file,
            fileName,
            compradorID,
            usuarioID
          );
          break;

        case 'garantia':
          response = await fileService.uploadGarantiaDocument(
            file,
            monto,
            compradorID
          );
          break;

        case 'pago':
          if (ordenPagoID) {
            response = await fileService.uploadPagoDocument(
              file,
              ordenPagoID,
              monto,
              usuarioID
            );
          } else if (articuloID) {
            response = await fileService.uploadPagoArticulo(
              file,
              articuloID,
              tipo
            );
          }
          break;

        case 'cliente':
          response = await fileService.uploadClienteDocument(
            file,
            clienteID,
            fileName,
            usuarioID
          );
          break;

        default:
          throw new Error('Tipo de upload no válido');
      }

      if (response.success) {
        if (onUploadComplete) {
          onUploadComplete(response.data);
        }
      } else {
        if (onError) {
          onError([{ file: file.name, message: response.message }]);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (onError) {
        onError([{ file: file.name, message: 'Error durante la subida' }]);
      }
    } finally {
      setUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled || uploading) return;
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // Input change handler
  const handleInputChange = (e) => {
    if (disabled || uploading) return;
    
    const files = e.target.files;
    handleFileSelect(files);
    
    // Clear input
    e.target.value = '';
  };

  // Click handler
  const handleClick = () => {
    if (!disabled && !uploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getAcceptString = () => {
    return acceptedTypes.join(',');
  };

  const getUploadText = () => {
    switch (uploadType) {
      case 'garantia':
        return 'Subir comprobante de garantía';
      case 'pago':
        return 'Subir comprobante de pago';
      case 'comprador':
        return 'Subir documento personal';
      case 'cliente':
        return 'Subir documento del cliente';
      case 'articulo':
        return 'Subir documento del artículo';
      default:
        return 'Subir documento';
    }
  };

  return (
    <div className={`document-uploader ${className}`}>
      <div
        className={`upload-drop-zone border-2 border-dashed rounded p-4 text-center position-relative ${
          dragOver ? 'border-primary bg-light' : 'border-secondary'
        } ${disabled || uploading ? 'opacity-50' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{ cursor: disabled || uploading ? 'not-allowed' : 'pointer' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptString()}
          onChange={handleInputChange}
          className="d-none"
          disabled={disabled || uploading}
        />

        <div className="upload-content">
          {uploading ? (
            <>
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Subiendo...</span>
              </div>
              <h6>Subiendo documento...</h6>
              <p className="text-muted mb-0">Por favor espera</p>
            </>
          ) : (
            <>
              <i className="fas fa-file-upload fa-3x text-primary mb-3"></i>
              <h6>{getUploadText()}</h6>
              <p className="text-muted mb-2">
                Arrastra el archivo aquí o haz clic para seleccionar
              </p>
              <small className="text-muted">
                Máximo {maxSizeMB}MB - {acceptedTypes.join(', ')}
              </small>
            </>
          )}
        </div>
      </div>

      {/* Additional form fields for specific upload types */}
      {uploadType === 'garantia' && (
        <div className="mt-3">
          <label className="form-label">
            <i className="fas fa-dollar-sign text-primary me-2"></i>
            Monto de la garantía
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={uploading}
              onChange={(e) => {
                // This would be handled by parent component
                // monto = e.target.value
              }}
            />
          </div>
        </div>
      )}

      {uploadType === 'pago' && ordenPagoID && (
        <div className="mt-3">
          <label className="form-label">
            <i className="fas fa-dollar-sign text-primary me-2"></i>
            Monto del pago
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={uploading}
              onChange={(e) => {
                // This would be handled by parent component
                // monto = e.target.value
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;