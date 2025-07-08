import React from 'react';

import { useCarImagesSection } from './useCarImagesSection';
import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { AuctionStatus } from '../../../components/ui/AuctionStatus';

const CarImagesSection = () => {
  const {
    carImagesHelpers,
    carImagesData,
    images,
    currentImageIndex,
    showModal,
    carDetails,
    handleImageClick,
    handleThumbnailClick,
    handleCloseModal,
    handlePrevImage,
    handleNextImage,
    loading,
    error
  } = useCarImagesSection();

  if (loading) return <div className="text-center py-5">{carImagesData.messages.loading}</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="col-lg-6">
      <div className="car-single-gallery">
        {/* Main Image */}
        <div className="car-single-gallery-main position-relative">
          <img 
            src={carImagesHelpers.getCurrentImage(images, currentImageIndex)} 
            alt={carImagesHelpers.getImageAlt(carDetails, currentImageIndex)}
            className="img-fluid"
            onClick={handleImageClick}
          />
          
          {/* Auction Status */}
          <AuctionStatus isActive={carImagesHelpers.isAuctionActive(carDetails)} />
          
          {/* Timer */}
          {carImagesHelpers.getAuctionEndDate(carDetails) && carImagesHelpers.isAuctionActive(carDetails) && (
            <AuctionTimer endDate={carImagesHelpers.getAuctionEndDate(carDetails)} />
          )}
          
          {/* Image Counter */}
          <div className="image-counter">
            <span>{currentImageIndex + 1} / {images.length}</span>
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                className="gallery-nav prev"
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <i className="far fa-chevron-left"></i>
              </button>
              <button 
                className="gallery-nav next"
                onClick={handleNextImage}
                disabled={currentImageIndex === images.length - 1}
              >
                <i className="far fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="car-single-gallery-thumbs">
            <div className="car-thumbs-wrapper">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`car-thumb ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={carImagesHelpers.getThumbnailImage(image)} 
                    alt={carImagesHelpers.getImageAlt(carDetails, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="gallery-modal" onClick={handleCloseModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={handleCloseModal}>
              <i className="far fa-times"></i>
            </button>
            
            <div className="gallery-modal-image">
              <img 
                src={carImagesHelpers.getCurrentImage(images, currentImageIndex)} 
                alt={carImagesHelpers.getImageAlt(carDetails, currentImageIndex)}
              />
            </div>
            
            {images.length > 1 && (
              <>
                <button 
                  className="gallery-modal-nav prev"
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                >
                  <i className="far fa-chevron-left"></i>
                </button>
                <button 
                  className="gallery-modal-nav next"
                  onClick={handleNextImage}
                  disabled={currentImageIndex === images.length - 1}
                >
                  <i className="far fa-chevron-right"></i>
                </button>
              </>
            )}
            
            <div className="gallery-modal-counter">
              <span>{currentImageIndex + 1} / {images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarImagesSection;