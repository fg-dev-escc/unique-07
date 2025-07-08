import React, { useState, useEffect } from 'react';

import { get } from '../../services/apiService';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import fileService from '../../services/fileService';

export const DocumentList = ({
  entityType = 'articulo', // 'articulo', 'comprador', 'cliente'
  entityID,
  editable = false,
  onDocumentDelete,
  onDocumentDownload,
  showUploader = false,
  className = ''
}) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (entityID) {
      loadDocuments();
    }
  }, [entityID, entityType]);

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint;
      
      switch (entityType) {
        case 'articulo':
          endpoint = API_ENDPOINTS.ARTICULOS.GET_DOCUMENTOS(entityID);
          break;
        case 'comprador':
          endpoint = API_ENDPOINTS.INFO_COMPRADOR.GET_DOCUMENTOS;
          break;
        case 'cliente':
          endpoint = API_ENDPOINTS.CLIENTES.GET_DOCUMENTOS(entityID);
          break;
        default:
          throw new Error('Entity type not supported');
      }

      const response = await get(endpoint);
      
      if (response.success) {
        setDocuments(response.data || []);
      } else {
        setError(response.message || 'Error al cargar documentos');
      }
    } catch (error) {
      console.error('Load documents error:', error);
      setError('Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (document) => {
    try {
      let response;
      const filename = `${document.nombre}.${document.ext || 'pdf'}`;

      switch (entityType) {
        case 'articulo':
          response = await fileService.downloadArticuloDocument(
            document.articuloDocumentoID,
            filename
          );
          break;
        case 'comprador':
          response = await fileService.downloadCompradorDocument(
            document.compradorDocumentoID,
            filename
          );
          break;
        case 'cliente':
          response = await fileService.downloadClienteDocument(
            document.clienteDocumentoID,
            filename
          );
          break;
      }

      if (response.success && onDocumentDownload) {
        onDocumentDownload(document);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDelete = async (document) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este documento?');
    if (!confirmed) return;

    const documentId = document.articuloDocumentoID || 
                      document.compradorDocumentoID || 
                      document.clienteDocumentoID;

    setDeleting(documentId);

    try {
      let response;

      switch (entityType) {
        case 'articulo':
          response = await fileService.deleteArticuloDocument(document.articuloDocumentoID);
          break;
        case 'comprador':
          response = await fileService.deleteCompradorDocument(document.compradorDocumentoID);
          break;
        case 'cliente':
          response = await fileService.deleteClienteDocument(document.clienteDocumentoID);
          break;
      }

      if (response.success) {
        const newDocuments = documents.filter(doc => {
          const docId = doc.articuloDocumentoID || 
                       doc.compradorDocumentoID || 
                       doc.clienteDocumentoID;
          return docId !== documentId;
        });
        setDocuments(newDocuments);

        if (onDocumentDelete) {
          onDocumentDelete(document);
        }
      } else {
        alert(response.message || 'Error al eliminar documento');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error al eliminar documento');
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes) => {
    return fileService.formatFileSize(bytes);
  };

  const getFileIcon = (filename) => {
    return fileService.getFileTypeIcon(filename);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`document-list ${className}`}>
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando documentos...</span>
          </div>
          <p className="mt-2">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`document-list ${className}`}>
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`document-list ${className}`}>
      {documents.length === 0 ? (
        <div className="text-center py-4">
          <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
          <p className="text-muted">No hay documentos disponibles</p>
          {showUploader && (
            <p className="text-muted">
              <small>Usa el formulario de arriba para subir documentos</small>
            </p>
          )}
        </div>
      ) : (
        <div className="documents-grid">
          <div className="row g-3">
            {documents.map((document) => {
              const documentId = document.articuloDocumentoID || 
                               document.compradorDocumentoID || 
                               document.clienteDocumentoID;
              
              return (
                <div key={documentId} className="col-md-6 col-lg-4">
                  <div className="document-card card h-100">
                    <div className="card-body d-flex flex-column">
                      {/* File Icon and Type */}
                      <div className="text-center mb-3">
                        <i className={`${getFileIcon(document.nombre)} fa-3x mb-2`}></i>
                        <div className="small text-muted text-uppercase">
                          {document.ext || document.tipo || 'Documento'}
                        </div>
                      </div>

                      {/* Document Info */}
                      <div className="flex-grow-1">
                        <h6 className="card-title text-truncate" title={document.nombre}>
                          {document.nombre}
                        </h6>
                        
                        <div className="document-meta">
                          {document.fechaCarga && (
                            <small className="text-muted d-block">
                              <i className="fas fa-calendar me-1"></i>
                              {formatDate(document.fechaCarga)}
                            </small>
                          )}
                          
                          {document.size && (
                            <small className="text-muted d-block">
                              <i className="fas fa-hdd me-1"></i>
                              {formatFileSize(document.size)}
                            </small>
                          )}

                          {document.usuarioCarga && (
                            <small className="text-muted d-block">
                              <i className="fas fa-user me-1"></i>
                              {document.usuarioCarga}
                            </small>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="document-actions mt-3">
                        <div className="btn-group w-100" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleDownload(document)}
                            title="Descargar"
                          >
                            <i className="fas fa-download"></i>
                          </button>

                          {document.url && (
                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm"
                              onClick={() => window.open(document.url, '_blank')}
                              title="Ver en nueva ventana"
                            >
                              <i className="fas fa-external-link-alt"></i>
                            </button>
                          )}

                          {editable && (
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(document)}
                              disabled={deleting === documentId}
                              title="Eliminar"
                            >
                              {deleting === documentId ? (
                                <i className="fas fa-spinner fa-spin"></i>
                              ) : (
                                <i className="fas fa-trash"></i>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Status indicators */}
                      <div className="document-status mt-2">
                        {document.esPrincipal && (
                          <span className="badge bg-primary me-1">
                            <i className="fas fa-star me-1"></i>
                            Principal
                          </span>
                        )}
                        
                        {document.marcadoEliminar && (
                          <span className="badge bg-warning">
                            <i className="fas fa-exclamation-triangle me-1"></i>
                            Marcado para eliminar
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Loading overlay */}
                    {deleting === documentId && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center rounded">
                        <div className="text-white text-center">
                          <div className="spinner-border spinner-border-sm mb-2" role="status"></div>
                          <div>Eliminando...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      {documents.length > 0 && (
        <div className="documents-summary mt-3 p-2 bg-light rounded">
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Total: {documents.length} documento{documents.length !== 1 ? 's' : ''}
          </small>
        </div>
      )}
    </div>
  );
};

export default DocumentList;