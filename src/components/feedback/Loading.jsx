import React from 'react';

export const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
};

export default Loading;