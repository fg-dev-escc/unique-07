import React from 'react';

import { useRelatedCarsSection } from './useRelatedCarsSection';
import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { AuctionStatus } from '../../../components/ui/AuctionStatus';

const RelatedCarsSection = () => {
  const {
    relatedCarsHelpers,
    relatedCarsData,
    relatedCars,
    handleCarClick,
    handleFavoriteClick,
    loading,
    error
  } = useRelatedCarsSection();

  if (loading) return <div className="text-center py-4">{relatedCarsData.messages.loading}</div>;
  if (error) return null;
  if (!relatedCars || relatedCars.length === 0) return null;

  return (
    <div className="related-cars-section py-120">
      <div className="container">
        <div className="related-cars-wrapper">
          <div className="section-header text-center mb-5">
            <h3>{relatedCarsData.title}</h3>
            <p className="text-muted">{relatedCarsData.subtitle}</p>
          </div>

          <div className="row">
            {relatedCars.map((car, index) => (
              <div key={car.id || index} className="col-lg-4 col-md-6 mb-4">
                <div className="car-item related-car-item">
                  <AuctionStatus isActive={relatedCarsHelpers.isAuctionActive(car)} />
                  
                  {relatedCarsHelpers.getAuctionEndDate(car) && relatedCarsHelpers.isAuctionActive(car) && (
                    <AuctionTimer endDate={relatedCarsHelpers.getAuctionEndDate(car)} />
                  )}
                  
                  <div className="car-img">
                    <img 
                      src={relatedCarsHelpers.getCarImage(car)} 
                      alt={relatedCarsHelpers.getCarTitle(car)}
                      onClick={() => handleCarClick(car.id)}
                    />
                    
                    <div className="car-overlay">
                      <div className="car-overlay-actions">
                        <button 
                          className="car-action-btn"
                          onClick={() => handleCarClick(car.id)}
                          title={relatedCarsData.buttons.viewDetails}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                        <button 
                          className="car-action-btn favorite-btn"
                          onClick={() => handleFavoriteClick(car.id)}
                          title={relatedCarsData.buttons.addToFavorites}
                        >
                          <i className="far fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="car-content">
                    <div className="car-top">
                      <h5>
                        <a href={`/car/${car.id}`} onClick={(e) => {
                          e.preventDefault();
                          handleCarClick(car.id);
                        }}>
                          {relatedCarsHelpers.getCarTitle(car)}
                        </a>
                      </h5>
                      <div className="car-rating">
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`fa${i < Math.floor(car.rating || relatedCarsData.defaults.rating) ? 's' : 'r'} fa-star`}
                            ></i>
                          ))}
                        </div>
                        <span className="rating-text">
                          ({car.reviewCount || relatedCarsData.defaults.reviewCount})
                        </span>
                      </div>
                    </div>
                    
                    <ul className="car-list">
                      {relatedCarsData.displayFields.map((field, fieldIndex) => {
                        const value = relatedCarsHelpers.getFieldValue(car, field.key);
                        if (!value && !field.showEmpty) return null;
                        
                        return (
                          <li key={fieldIndex}>
                            <i className={field.icon}></i>
                            {field.label}: {value}
                          </li>
                        );
                      })}
                    </ul>
                    
                    <div className="car-footer">
                      <div className="car-price">
                        <span className="price-amount">
                          {relatedCarsHelpers.formatPrice(car.precio)}
                        </span>
                        <sub className="price-period">{relatedCarsData.labels.startingBid}</sub>
                      </div>
                      
                      <div className="car-status">
                        <span className={`badge ${relatedCarsHelpers.getStatusBadgeClass(car)}`}>
                          {relatedCarsHelpers.getStatusLabel(car)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="car-meta">
                      <div className="car-location">
                        <i className="far fa-map-marker-alt"></i>
                        <span>{car.ubicacion || relatedCarsData.defaults.location}</span>
                      </div>
                      
                      {relatedCarsHelpers.getTimeLeft(car) && (
                        <div className="car-time-left">
                          <i className="far fa-clock"></i>
                          <span>{relatedCarsHelpers.getTimeLeft(car)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="car-action-footer">
                      <button 
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => handleCarClick(car.id)}
                      >
                        {relatedCarsData.buttons.viewAuction}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <a href="/cars" className="btn btn-outline-primary">
              {relatedCarsData.buttons.viewAll}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedCarsSection;