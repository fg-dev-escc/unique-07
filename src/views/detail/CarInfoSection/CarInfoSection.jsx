import React from 'react';

import { useCarInfoSection } from './useCarInfoSection';
import BiddingInterfaceSection from '../BiddingInterfaceSection/BiddingInterfaceSection';

const CarInfoSection = () => {
  const {
    carInfoHelpers,
    carInfoData,
    carDetails,
    handleShare,
    handleFavorite,
    handleContact,
    loading,
    error
  } = useCarInfoSection();

  if (loading) return <div className="text-center py-4">{carInfoData.messages.loading}</div>;
  if (error) return <div className="text-center py-4 text-danger">{error}</div>;

  return (
    <div className="col-lg-6">
      <div className="car-single-info">
        {/* Title and Basic Info */}
        <div className="car-single-title">
          <h2>{carInfoHelpers.getCarTitle(carDetails)}</h2>
          <div className="car-single-meta">
            <span className="car-single-price">
              {carInfoHelpers.formatPrice(carDetails?.precio)}
            </span>
            <div className="car-single-rating">
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fa${i < Math.floor(carDetails?.rating || 5) ? 's' : 'r'} fa-star`}
                  ></i>
                ))}
              </div>
              <span className="rating-count">
                ({carDetails?.reviewCount || carInfoData.defaults.reviewCount} {carInfoData.labels.reviews})
              </span>
            </div>
          </div>
        </div>

        {/* Car Details List */}
        <div className="car-single-details">
          <ul className="car-single-details-list">
            {carInfoData.detailFields.map((field, index) => {
              const value = carInfoHelpers.getFieldValue(carDetails, field.key);
              if (!value && !field.showEmpty) return null;
              
              return (
                <li key={index}>
                  <i className={field.icon}></i>
                  <span className="detail-label">{field.label}:</span>
                  <span className="detail-value">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Description */}
        {carDetails?.descripcion && (
          <div className="car-single-description">
            <h5>{carInfoData.labels.description}</h5>
            <p>{carDetails.descripcion}</p>
          </div>
        )}

        {/* Features */}
        {carDetails?.caracteristicas && carDetails.caracteristicas.length > 0 && (
          <div className="car-single-features">
            <h5>{carInfoData.labels.features}</h5>
            <div className="features-list">
              {carDetails.caracteristicas.map((feature, index) => (
                <span key={index} className="feature-item">
                  <i className="far fa-check"></i>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="car-single-actions">
          <div className="car-single-actions-top">
            <button 
              className="btn btn-outline-primary"
              onClick={() => handleFavorite(carDetails?.id)}
            >
              <i className="far fa-heart"></i>
              {carInfoData.buttons.addToFavorites}
            </button>
            
            <button 
              className="btn btn-outline-secondary"
              onClick={() => handleShare(carDetails)}
            >
              <i className="far fa-share-alt"></i>
              {carInfoData.buttons.share}
            </button>
            
            <button 
              className="btn btn-outline-info"
              onClick={() => handleContact(carDetails?.seller)}
            >
              <i className="far fa-envelope"></i>
              {carInfoData.buttons.contact}
            </button>
          </div>
        </div>

        {/* Seller Info */}
        {carDetails?.seller && (
          <div className="car-single-seller">
            <h5>{carInfoData.labels.seller}</h5>
            <div className="seller-info">
              <div className="seller-avatar">
                <img 
                  src={carDetails.seller.avatar || carInfoData.defaults.sellerAvatar} 
                  alt={carDetails.seller.name}
                />
              </div>
              <div className="seller-details">
                <h6>{carDetails.seller.name}</h6>
                <div className="seller-rating">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fa${i < Math.floor(carDetails.seller.rating || 5) ? 's' : 'r'} fa-star`}
                      ></i>
                    ))}
                  </div>
                  <span>({carDetails.seller.reviewCount || 0})</span>
                </div>
                <p className="seller-location">
                  <i className="far fa-map-marker-alt"></i>
                  {carDetails.seller.location || carInfoData.defaults.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bidding Interface */}
        <BiddingInterfaceSection />
      </div>
    </div>
  );
};

export default CarInfoSection;