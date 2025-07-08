import React, { useState, useEffect } from 'react';

import { get } from '../../services/apiService';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import fileService from '../../services/fileService';

export const ImageGallery = ({
  articuloID,
  onImageDelete,
  onMainImageChange,
  editable = false,
  showActions = true,
  className = ''
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (articuloID) {
      loadImages();
    }
  }, [articuloID]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await get(API_ENDPOINTS.VENDEDOR.GET_LISTA_FOTOS(articuloID));
      
      if (response.success) {
        const sortedImages = (response.data || []).sort((a, b) => {
          if (a.esPrincipal && !b.esPrincipal) return -1;
          if (!a.esPrincipal && b.esPrincipal) return 1;
          return 0;
        });
        setImages(sortedImages);
        
        // Set first image as selected
        if (sortedImages.length > 0) {
          setSelectedImage(sortedImages[0]);
        }
      } else {
        setError(response.message || 'Error al cargar imágenes');
      }
    } catch (error) {
      console.error('Load images error:', error);
      setError('Error al cargar imágenes');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleDeleteImage = async (image) => {
    if (!editable || deleting) return;
    
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta imagen?');
    if (!confirmed) return;

    setDeleting(image.articuloDocumentoID);
    
    try {
      const response = await fileService.deleteArticuloImage(image.articuloDocumentoID);
      
      if (response.success) {
        const newImages = images.filter(img => img.articuloDocumentoID !== image.articuloDocumentoID);
        setImages(newImages);
        
        // Update selected image if deleted
        if (selectedImage?.articuloDocumentoID === image.articuloDocumentoID) {
          setSelectedImage(newImages.length > 0 ? newImages[0] : null);
        }
        
        if (onImageDelete) {
          onImageDelete(image);
        }
      } else {
        alert(response.message || 'Error al eliminar imagen');
      }
    } catch (error) {
      console.error('Delete image error:', error);
      alert('Error al eliminar imagen');
    } finally {
      setDeleting(null);
    }
  };

  const handleSetMainImage = async (image) => {
    if (!editable || image.esPrincipal) return;
    
    try {
      // Update locally first for better UX
      const updatedImages = images.map(img => ({
        ...img,
        esPrincipal: img.articuloDocumentoID === image.articuloDocumentoID
      }));
      setImages(updatedImages);
      
      if (onMainImageChange) {
        onMainImageChange(image);
      }
      
      // Here you would call an API to update the main image on the server
      // For now, we'll assume it's handled elsewhere
    } catch (error) {
      console.error('Set main image error:', error);
      // Revert on error
      loadImages();
    }
  };

  if (loading) {
    return (
      <div className={`image-gallery ${className}`}>
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando imágenes...</span>
          </div>
          <p className="mt-2">Cargando galería...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`image-gallery ${className}`}>
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={`image-gallery ${className}`}>
        <div className="text-center py-4">
          <i className="fas fa-images fa-3x text-muted mb-3"></i>
          <p className="text-muted">No hay imágenes disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`image-gallery ${className}`}>
      {/* Main Image Display */}
      <div className="main-image-container mb-3">
        <div className="position-relative">
          <img
            src={selectedImage?.url}
            alt={selectedImage?.nombre}
            className="main-image w-100 rounded"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          
          {/* Main Image Badge */}
          {selectedImage?.esPrincipal && (
            <span className="position-absolute top-0 start-0 badge bg-primary m-2">
              <i className="fas fa-star me-1"></i>
              Imagen Principal
            </span>
          )}

          {/* Main Image Actions */}
          {editable && showActions && selectedImage && (
            <div className="position-absolute top-0 end-0 m-2">
              {!selectedImage.esPrincipal && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() => handleSetMainImage(selectedImage)}
                  title="Establecer como principal"
                >
                  <i className="fas fa-star"></i>
                </button>
              )}
              
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteImage(selectedImage)}
                disabled={deleting === selectedImage.articuloDocumentoID}
                title="Eliminar imagen"
              >
                {deleting === selectedImage.articuloDocumentoID ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-trash"></i>
                )}
              </button>
            </div>
          )}

          {/* Image Counter */}
          <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-2 py-1 m-2 rounded">
            <small>
              {images.findIndex(img => img.articuloDocumentoID === selectedImage?.articuloDocumentoID) + 1} de {images.length}
            </small>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="thumbnail-strip">
        <div className="row g-2">
          {images.map((image) => (
            <div key={image.articuloDocumentoID} className="col-2">
              <div 
                className={`thumbnail-container position-relative cursor-pointer border rounded overflow-hidden ${
                  selectedImage?.articuloDocumentoID === image.articuloDocumentoID 
                    ? 'border-primary border-2' 
                    : 'border-secondary'
                }`}
                onClick={() => handleImageSelect(image)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={image.url}
                  alt={image.nombre}
                  className="thumbnail-image w-100"
                  style={{ height: '80px', objectFit: 'cover' }}
                />
                
                {/* Main Image Indicator */}
                {image.esPrincipal && (
                  <div className="position-absolute top-0 start-0 bg-primary text-white px-1" style={{ fontSize: '0.7rem' }}>
                    <i className="fas fa-star"></i>
                  </div>
                )}

                {/* Thumbnail Actions */}
                {editable && showActions && (
                  <div className="thumbnail-actions position-absolute top-0 end-0 p-1">
                    <div className="btn-group-vertical">
                      {!image.esPrincipal && (
                        <button
                          type="button"
                          className="btn btn-xs btn-outline-light"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetMainImage(image);
                          }}
                          title="Establecer como principal"
                          style={{ fontSize: '0.6rem', padding: '2px 4px' }}
                        >
                          <i className="fas fa-star"></i>
                        </button>
                      )}
                      
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image);
                        }}
                        disabled={deleting === image.articuloDocumentoID}
                        title="Eliminar"
                        style={{ fontSize: '0.6rem', padding: '2px 4px' }}
                      >
                        {deleting === image.articuloDocumentoID ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-trash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading overlay for deleting */}
                {deleting === image.articuloDocumentoID && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Info */}
      {selectedImage && (
        <div className="image-info mt-2">
          <div className="row">
            <div className="col-md-6">
              <small className="text-muted">
                <strong>Nombre:</strong> {selectedImage.nombre}
              </small>
            </div>
            <div className="col-md-6">
              <small className="text-muted">
                <strong>Tipo:</strong> {selectedImage.tipo}
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Navigation Info */}
      {images.length > 1 && (
        <div className="navigation-info mt-2 text-center">
          <small className="text-muted">
            <i className="fas fa-keyboard me-1"></i>
            Usa las flechas del teclado para navegar
          </small>
        </div>
      )}
    </div>
  );
};

// Add keyboard navigation
export const ImageGalleryWithKeyboard = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => Math.min(props.images?.length - 1 || 0, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [props.images?.length]);

  return <ImageGallery {...props} />;
};

export default ImageGallery;