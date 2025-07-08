import React from 'react';
import { useSelector } from 'react-redux';

import { carInfoConfig } from './carInfoConfig';
import { detailConfig } from '../detailConfig';
import { useCarDetail } from '../hooks/useCarDetail';
import BiddingInterface from './BiddingInterface/BiddingInterface';
import { consLogged } from '../../../const/consLogged';

const CarInfo = () => {
  // hooks
  const { car } = useCarDetail();
  
  // config
  const { data } = carInfoConfig;
  const { helpers } = detailConfig;
  
  // redux state
  const { logged } = useSelector(state => state.userReducer);
  const isAuthenticated = logged === consLogged.LOGGED;

  if (!car) return null;

  const timeLeft = helpers.getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';

  // Mapear campos de la API para mostrar en Car Details
  const getCarDetails = () => {
    const details = [];
    if (car.modelo) details.push({ icon: 'far fa-car', label: 'Modelo', value: car.modelo });
    if (car.capacidad) details.push({ icon: 'far fa-user-tie', label: 'Capacidad', value: `${car.capacidad} Personas` });
    if (car.tipoCombustible) details.push({ icon: 'far fa-gas-pump', label: 'Combustible', value: car.tipoCombustible });
    if (car.rendimiento) details.push({ icon: 'far fa-road', label: 'Rendimiento', value: car.rendimiento });
    if (car.transmision) details.push({ icon: 'far fa-steering-wheel', label: 'Transmisión', value: car.transmision });
    return details;
  };

  // Mapear campos para Car Terms (términos de subasta)
  const getCarTerms = () => {
    const terms = [];
    if (car.vendedor) terms.push({ label: 'Vendedor', value: car.vendedor });
    if (car.comisionTransferencia) terms.push({ label: 'Comisión de Transferencia', value: helpers.formatPrice(car.comisionTransferencia) });
    if (car.comisionDisposicion) terms.push({ label: 'Comisión de Disposición', value: helpers.formatPrice(car.comisionDisposicion) });
    if (car.ubicacion) terms.push({ label: 'Ubicación', value: car.ubicacion });
    return terms;
  };

  const carDetails = getCarDetails();
  const carTerms = getCarTerms();

  return (
    <div className="col-lg-4">
      <div className="car-single-info">
        <h3 className="car-single-title">{car.nombre}</h3>
        
        <div className="car-single-rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
          <i className="far fa-star"></i>
          <span className="rating-count"> ({data.labels.customerReviews})</span>
        </div>
        
        {/* auction status */}
        <div className="car-single-auction-status mb-3">
          {isActive ? (
            <span className="badge bg-success mb-2">
              <i className="far fa-clock me-1"></i>
              {data.labels.activeAuction}
            </span>
          ) : (
            <span className="badge bg-danger text-white">
              <i className="far fa-clock me-1"></i>
              {data.labels.auctionEnded}
            </span>
          )}
        </div>

        <div className="car-single-price">
          <span className="car-price">
            {helpers.formatPrice(car.precio)} 
            <sub>{data.labels.currentBid}</sub>
          </span>
          <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
          {isActive && (
            <a href="#pujar" className="theme-btn">Pujar Ahora</a>
          )}
        </div>
        
        {/* Car Details */}
        {carDetails.length > 0 && (
          <div className="car-single-details">
            <h5 className="mb-2">Detalles del Vehículo</h5>
            <ul className="car-list m-0">
              {carDetails.map((detail, index) => (
                <li key={index}>
                  <i className={detail.icon}></i>
                  {detail.label}: {detail.value}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Car Terms */}
        {carTerms.length > 0 && (
          <div className="car-single-terms mb-3">
            <h5 className="mb-2">Términos de Subasta</h5>
            <ul className="car-single-terms-list">
              {carTerms.map((term, index) => (
                <li key={index}>
                  {term.label}: <span>{term.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Bidding Interface - Only show if user is logged in */}
        {isAuthenticated && isActive && (
          <div className="car-single-bidding mb-4" id="pujar">
            <BiddingInterface car={car} isActive={isActive} />
          </div>
        )}
        
        {/* Show login message if user is not logged in */}
        {!isAuthenticated && isActive && (
          <div className="car-single-auth-message mb-4">
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Inicia sesión para participar en la subasta</strong>
              <br />
              <small>Para realizar ofertas y ver el historial de pujas completo, debes iniciar sesión.</small>
              <div className="mt-2">
                <a href="/login" className="theme-btn me-2">
                  <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                </a>
                <a href="/register" className="theme-btn theme-btn-outline">
                  <i className="fas fa-user-plus"></i> Registrarse
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="car-single-share">
          <h5 className="mb-3">Compartir Subasta</h5>
          <div className="car-single-share-icon">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;