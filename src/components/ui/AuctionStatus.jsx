import React from 'react';

export const AuctionStatus = ({ isActive, className = "" }) => {
  const getStatusText = () => {
    return isActive ? 'Subasta Activa' : 'Subasta Terminada';
  };

  const getBadgeClass = () => {
    return isActive ? 'bg-success' : 'bg-danger text-white';
  };

  const getIcon = () => {
    return <i className="far fa-clock me-1"></i>;
  };

  return (
    <div className={`auction-status-badge position-absolute ${className}`} 
         style={{
           top: '15px',
           left: '15px',
           zIndex: 2
         }}>
      <span className={`badge ${getBadgeClass()}`}>
        {getIcon()}
        {getStatusText()}
      </span>
    </div>
  );
};

export default AuctionStatus;