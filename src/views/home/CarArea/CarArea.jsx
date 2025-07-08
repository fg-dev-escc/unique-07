import React from 'react';

import { AuctionTimer } from '../../../components/ui/AuctionTimer';
import { AuctionStatus } from '../../../components/ui/AuctionStatus';

import { useCarArea } from './useCarArea';

export const CarArea = ({ scope = 'main' }) => {
  const {
    carAreaHelpers,
    carAreaData,
    handleSearchSubmit,
    handleSortChange,
    handleLoadMore,
    handleSearchChange,
    loading,
    error,
    featuredCars,
    sortBy,
    searchQuery
  } = useCarArea(scope);

  if (loading) return <div className="text-center py-5">{carAreaData.messages.loading}</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  
  return (
    <div className="car-area bg py-120 car-section-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{carAreaData.sectionTitle.tagline}</span>
              <h2 className="site-title">
                {carAreaData.sectionTitle.title} <span>{carAreaData.sectionTitle.titleSpan}</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        
        {/* search */}
        <div className="col-md-12 mb-4">
          <div className="car-sort car-sort-container">
            <div className="car-widget p-0 m-0">
              <div className="car-search-form">
                <form onSubmit={handleSearchSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={carAreaData.searchPlaceholder}
                      value={searchQuery} 
                      onChange={handleSearchChange} 
                    />
                    <button type="search">
                      <i className="far fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="car-sort-box">
              <select 
                className="form-select car-sort-select" 
                value={sortBy} 
                onChange={handleSortChange}
              >
                {carAreaData.sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* grid */}
        <div className="row">
          {featuredCars && featuredCars.length > 0 ? (
            featuredCars.map((car) => (
              <div key={car.torreID || car.id} className="col-lg-6 col-xl-4">
                <div className="car-item position-relative">
                  {/* status */}
                  <AuctionStatus isActive={carAreaHelpers.isAuctionActive(car)} />
                  
                  {/* timer */}
                  {carAreaHelpers.getAuctionEndDate(car) && carAreaHelpers.isAuctionActive(car) && (
                    <AuctionTimer endDate={carAreaHelpers.getAuctionEndDate(car)} />
                  )}
                  
                  <div className="car-img">
                    <img 
                      src={carAreaHelpers.getCarImage(car)} 
                      alt={carAreaHelpers.getCarName(car)} 
                    />
                  </div>
                  <div className="car-content">
                    <div className="car-top">
                      <h4><a href="#">{carAreaHelpers.getCarName(car)}</a></h4>
                      <span><i className="fas fa-star"></i> {carAreaData.defaults.rating}</span>
                    </div>
                    <ul className="car-list">
                      <li><i className="far fa-car"></i>{carAreaData.labels.model}: {carAreaHelpers.getCarModel(car)}</li>
                      <li><i className="far fa-user-tie"></i>{carAreaHelpers.getCarCapacity(car)} {carAreaData.labels.people}</li>
                      <li><i className="far fa-gas-pump"></i>{carAreaHelpers.getCarFuel(car)}</li>
                      <li><i className="far fa-road"></i>{carAreaHelpers.getCarEfficiency(car)}</li>
                      <li><i className="far fa-steering-wheel"></i>{carAreaHelpers.getCarTransmission(car)}</li>
                    </ul>
                    <div className="car-footer">
                      <span className="car-price">
                        {carAreaHelpers.formatPrice(car.precio)} 
                        <sub>{carAreaData.labels.perMonth}</sub>
                      </span>
                      <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
                      <a href={carAreaHelpers.getCarLink(car)} className="theme-btn">{carAreaData.labels.rentNow}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">{carAreaData.messages.noResults}</div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="theme-btn" onClick={handleLoadMore}>
            {carAreaData.labels.loadMore} <i className="far fa-arrow-rotate-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};