import React from 'react';

import { relatedCarsConfig } from './relatedCarsConfig';
import { detailConfig } from '../detailConfig';
import { AuctionTimer } from '../../../components/ui/AuctionTimer';

const RelatedCars = () => {
  // config
  const { data } = relatedCarsConfig;
  const { helpers } = detailConfig;

  // Solo mostrar los primeros 3 carros relacionados
  const relatedCarsToShow = data.content.relatedCars.slice(0, 3);

  return (
    <div className="container">
      <div className="car-related-item pt-80">
        <div className="car-related-item-heading">
          <h3 className="car-related-item-title">También Te Puede Interesar</h3>
          <a href="/">Ver Más <i className="far fa-arrow-right"></i></a>
        </div>
        <div className="row align-items-center">
          {relatedCarsToShow.map((relatedCar, index) => (
            <div key={index} className="col-lg-6 col-xl-4">
              <div className="car-item position-relative">
                {/* Timer badge - simulated for related cars */}
                <AuctionTimer endDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} />
                
                <div className="car-img">
                  <img src={relatedCar.image} alt={relatedCar.name} />
                </div>
                <div className="car-content">
                  <div className="car-top">
                    <h4><a href="#">{relatedCar.name}</a></h4>
                    <span><i className="fas fa-star"></i> {relatedCar.rating}</span>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>Modelo: {relatedCar.model}</li>
                    <li><i className="far fa-user-tie"></i>{relatedCar.capacity} Personas</li>
                    <li><i className="far fa-gas-pump"></i>{relatedCar.fuel}</li>
                    <li><i className="far fa-road"></i>{relatedCar.efficiency}</li>
                    <li><i className="far fa-steering-wheel"></i>{relatedCar.transmission}</li>
                  </ul>
                  <div className="car-footer">
                    <span className="car-price">
                      {helpers.formatPrice(relatedCar.price)} 
                      <sub>/ puja actual</sub>
                    </span>
                    <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
                    <a href="#" className="theme-btn">Ver Subasta</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedCars;