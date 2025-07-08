import React, { useState, useCallback } from 'react';

import { DocumentUploader } from './DocumentUploader';
import { DocumentList } from './DocumentList';

export const DocumentManager = ({
  entityType = 'articulo',
  entityID,
  uploadType = 'general',
  maxSizeMB = 25,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
  allowUpload = true,
  allowDelete = true,
  allowDownload = true,
  className = '',
  // Props específicos por tipo
  articuloID = null,
  compradorID = null,
  clienteID = null,
  ordenPagoID = null,
  usuarioID = null,
  monto = null,
  tipo = null,
  // Event handlers
  onUploadComplete,
  onDocumentDelete,
  onDocumentDownload,
  onError
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadComplete = useCallback((uploadedDocument) => {
    // Refresh document list
    setRefreshKey(prev => prev + 1);
    
    // Clear any upload errors
    setUploadErrors([]);
    
    // Call parent handler if provided
    if (onUploadComplete) {
      onUploadComplete(uploadedDocument);
    }
  }, [onUploadComplete]);

  const handleUploadError = useCallback((errors) => {
    setUploadErrors(errors);
    
    // Call parent handler if provided
    if (onError) {
      onError(errors);
    }
  }, [onError]);

  const handleDocumentDelete = useCallback((deletedDocument) => {
    // Refresh document list
    setRefreshKey(prev => prev + 1);
    
    // Call parent handler if provided
    if (onDocumentDelete) {
      onDocumentDelete(deletedDocument);
    }
  }, [onDocumentDelete]);

  const handleDocumentDownload = useCallback((document) => {
    // Call parent handler if provided
    if (onDocumentDownload) {
      onDocumentDownload(document);
    }
  }, [onDocumentDownload]);

  const clearErrors = () => {
    setUploadErrors([]);
  };

  const getManagerTitle = () => {
    switch (entityType) {
      case 'articulo':
        return 'Documentos del Artículo';
      case 'comprador':
        return 'Documentos del Comprador';
      case 'cliente':
        return 'Documentos del Cliente';
      case 'garantia':
        return 'Comprobantes de Garantía';
      case 'pago':
        return 'Comprobantes de Pago';
      default:
        return 'Gestión de Documentos';
    }
  };

  return (
    <div className={`document-manager ${className}`}>
      <div className="document-manager-header mb-4">
        <h4 className="mb-3">
          <i className="fas fa-folder-open text-primary me-2"></i>
          {getManagerTitle()}
        </h4>
        
        {uploadErrors.length > 0 && (
          <div className="alert alert-danger alert-dismissible">
            <strong>Error al subir documentos:</strong>
            <ul className="mb-0 mt-2">
              {uploadErrors.map((error, index) => (
                <li key={index}>
                  <strong>{error.file}:</strong> {error.message}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn-close"
              onClick={clearErrors}
              aria-label="Cerrar"
            ></button>
          </div>
        )}
      </div>

      {/* Upload Section */}
      {allowUpload && (
        <div className="document-manager-upload mb-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="fas fa-upload text-primary me-2"></i>
                Subir Documentos
              </h6>
            </div>
            <div className="card-body">
              <DocumentUploader
                onUploadComplete={handleUploadComplete}
                onError={handleUploadError}
                uploadType={uploadType}
                maxSizeMB={maxSizeMB}
                acceptedTypes={acceptedTypes}
                disabled={uploading}
                articuloID={articuloID}
                compradorID={compradorID}
                clienteID={clienteID}
                ordenPagoID={ordenPagoID}
                usuarioID={usuarioID}
                monto={monto}
                tipo={tipo}
              />
            </div>
          </div>
        </div>
      )}

      {/* Documents List Section */}
      <div className="document-manager-list">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">
              <i className="fas fa-file-alt text-primary me-2"></i>
              Documentos
            </h6>
          </div>
          <div className="card-body">
            <DocumentList
              key={refreshKey}
              entityType={entityType}
              entityID={entityID}
              editable={allowDelete}
              onDocumentDelete={handleDocumentDelete}
              onDocumentDownload={handleDocumentDownload}
              showUploader={allowUpload}
            />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="document-manager-help mt-3">
        <div className="card bg-light">
          <div className="card-body">
            <h6 className="card-title">
              <i className="fas fa-info-circle text-info me-2"></i>
              Información sobre Documentos
            </h6>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Tipos de archivo aceptados:</strong>
                </p>
                <ul className="small mb-0">
                  <li>Documentos PDF (.pdf)</li>
                  <li>Documentos Word (.doc, .docx)</li>
                  <li>Hojas de cálculo (.xls, .xlsx)</li>
                  <li>Imágenes (.jpg, .jpeg, .png)</li>
                </ul>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Límites:</strong>
                </p>
                <ul className="small mb-0">
                  <li>Tamaño máximo: {maxSizeMB}MB por archivo</li>
                  <li>Formatos seguros y validados</li>
                  <li>Almacenamiento seguro en la nube</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;