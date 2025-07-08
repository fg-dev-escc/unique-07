import React from 'react';

import { useCarTabsSection } from './useCarTabsSection';

const CarTabsSection = () => {
  const {
    carTabsHelpers,
    carTabsData,
    activeTab,
    carDetails,
    handleTabChange,
    loading,
    error
  } = useCarTabsSection();

  if (loading) return <div className="text-center py-4">{carTabsData.messages.loading}</div>;

  return (
    <div className="car-tabs-section py-120">
      <div className="container">
        <div className="car-tabs-wrapper">
          {/* Tab Navigation */}
          <ul className="nav nav-pills car-tabs-nav" role="tablist">
            {carTabsData.tabs.map((tab, index) => (
              <li key={index} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                  type="button"
                  role="tab"
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          <div className="tab-content car-tabs-content">
            
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="tab-pane fade show active">
                <div className="car-description">
                  <h4>{carTabsData.tabs.find(t => t.id === 'description')?.label}</h4>
                  <div className="description-content">
                    {carDetails?.descripcion ? (
                      <p>{carDetails.descripcion}</p>
                    ) : (
                      <p className="text-muted">{carTabsData.messages.noDescription}</p>
                    )}
                    
                    {carDetails?.caracteristicas && carDetails.caracteristicas.length > 0 && (
                      <div className="features-section mt-4">
                        <h5>{carTabsData.labels.features}</h5>
                        <div className="row">
                          {carDetails.caracteristicas.map((feature, index) => (
                            <div key={index} className="col-md-6 mb-2">
                              <div className="feature-item">
                                <i className="far fa-check text-success"></i>
                                <span>{feature}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info Tab */}
            {activeTab === 'additional' && (
              <div className="tab-pane fade show active">
                <div className="car-additional-info">
                  <h4>{carTabsData.tabs.find(t => t.id === 'additional')?.label}</h4>
                  <div className="additional-content">
                    <div className="row">
                      {carTabsData.additionalFields.map((field, index) => {
                        const value = carTabsHelpers.getFieldValue(carDetails, field.key);
                        if (!value && !field.showEmpty) return null;
                        
                        return (
                          <div key={index} className="col-md-6 mb-3">
                            <div className="info-item">
                              <strong>{field.label}:</strong>
                              <span className="ms-2">{value}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="tab-pane fade show active">
                <div className="car-documents">
                  <h4>{carTabsData.tabs.find(t => t.id === 'documents')?.label}</h4>
                  <div className="documents-content">
                    {carDetails?.documentos && carDetails.documentos.length > 0 ? (
                      <div className="documents-list">
                        {carDetails.documentos.map((doc, index) => (
                          <div key={index} className="document-item">
                            <div className="document-info">
                              <i className="far fa-file-pdf"></i>
                              <div className="document-details">
                                <h6>{doc.nombre || `Documento ${index + 1}`}</h6>
                                <small className="text-muted">{doc.tipo || 'PDF'}</small>
                              </div>
                            </div>
                            <div className="document-actions">
                              <a 
                                href={doc.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                <i className="far fa-download"></i>
                                {carTabsData.buttons.download}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">{carTabsData.messages.noDocuments}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="tab-pane fade show active">
                <div className="car-videos">
                  <h4>{carTabsData.tabs.find(t => t.id === 'videos')?.label}</h4>
                  <div className="videos-content">
                    {carDetails?.videos && carDetails.videos.length > 0 ? (
                      <div className="videos-grid">
                        {carDetails.videos.map((video, index) => (
                          <div key={index} className="video-item">
                            {carTabsHelpers.isYouTubeVideo(video.url) ? (
                              <div className="video-embed">
                                <iframe
                                  src={carTabsHelpers.getYouTubeEmbedUrl(video.url)}
                                  title={video.titulo || `Video ${index + 1}`}
                                  frameBorder="0"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            ) : (
                              <video controls className="video-player">
                                <source src={video.url} type="video/mp4" />
                                {carTabsData.messages.videoNotSupported}
                              </video>
                            )}
                            {video.titulo && (
                              <h6 className="video-title mt-2">{video.titulo}</h6>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">{carTabsData.messages.noVideos}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-pane fade show active">
                <div className="car-reviews">
                  <h4>{carTabsData.tabs.find(t => t.id === 'reviews')?.label}</h4>
                  <div className="reviews-content">
                    {carDetails?.reseñas && carDetails.reseñas.length > 0 ? (
                      <div className="reviews-list">
                        {carDetails.reseñas.map((review, index) => (
                          <div key={index} className="review-item">
                            <div className="review-header">
                              <div className="reviewer-info">
                                <img 
                                  src={review.avatar || carTabsData.defaults.userAvatar} 
                                  alt={review.nombre}
                                  className="reviewer-avatar"
                                />
                                <div className="reviewer-details">
                                  <h6>{review.nombre}</h6>
                                  <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                      <i 
                                        key={i} 
                                        className={`fa${i < review.calificacion ? 's' : 'r'} fa-star`}
                                      ></i>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="review-date">
                                <small className="text-muted">
                                  {carTabsHelpers.formatDate(review.fecha)}
                                </small>
                              </div>
                            </div>
                            <div className="review-content">
                              <p>{review.comentario}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">{carTabsData.messages.noReviews}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTabsSection;