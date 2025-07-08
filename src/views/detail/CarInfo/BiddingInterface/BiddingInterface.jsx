import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BiddingInterface = ({ car, isActive }) => {
  const dispatch = useDispatch();
  const [customBid, setCustomBid] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redux state
  const { user } = useSelector(state => state.userReducer);
  const { pujaMayor } = useSelector(state => state.auctionReducer);
  
  // Get current highest bid or starting price
  const currentBid = pujaMayor?.monto || car.precio || 0;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle quick bid buttons
  const handleQuickBid = async (increment) => {
    if (!isActive) return;
    
    const newBid = currentBid + increment;
    await submitBid(newBid);
  };
  
  // Handle custom bid
  const handleCustomBid = async () => {
    if (!isActive) return;
    
    const bidAmount = parseInt(customBid);
    
    // Validation
    if (!bidAmount || bidAmount <= 0) {
      setError('La oferta debe ser mayor a 0');
      return;
    }
    
    if (bidAmount % 1000 !== 0) {
      setError('La oferta debe ser múltiplo de $1,000');
      return;
    }
    
    if (bidAmount <= currentBid) {
      setError(`La oferta debe ser mayor a ${formatCurrency(currentBid)}`);
      return;
    }
    
    await submitBid(bidAmount);
  };
  
  // Submit bid to API
  const submitBid = async (amount) => {
    if (!user?.usuarioID) {
      setError('Debe iniciar sesión para realizar una oferta');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const bidData = {
        monto: amount,
        torreID: car.articuloID,
        usuarioPujaID: user.usuarioID,
        fecha: new Date().toISOString()
      };
      
      // TODO: Dispatch action to submit bid
      // dispatch(submitBid(bidData));
      
      console.log('Bid submitted:', bidData);
      
      // Clear custom bid input
      setCustomBid('');
      
    } catch (error) {
      setError('Error al enviar la oferta. Intente nuevamente.');
      console.error('Bid submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setCustomBid(e.target.value);
    setError('');
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomBid();
    }
  };
  
  if (!isActive) {
    return (
      <div className="bidding-interface-disabled">
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Esta subasta ha terminado
        </div>
      </div>
    );
  }
  
  return (
    <div className="bidding-interface">
      <div className="current-bid-info mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">Oferta actual:</span>
          <span className="fw-bold text-primary fs-5">{formatCurrency(currentBid)}</span>
        </div>
      </div>
      
      {/* Three Quick Bid Buttons */}
      <div className="quick-bid-buttons mb-3">
        <div className="row g-2">
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => handleQuickBid(10000)}
              disabled={isLoading}
              title="Agregar $10,000 a la oferta actual"
            >
              <i className="fas fa-plus me-1"></i>
              {formatCurrency(10000)}
            </button>
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => handleQuickBid(50000)}
              disabled={isLoading}
              title="Agregar $50,000 a la oferta actual"
            >
              <i className="fas fa-plus me-1"></i>
              {formatCurrency(50000)}
            </button>
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => handleQuickBid(100000)}
              disabled={isLoading}
              title="Agregar $100,000 a la oferta actual"
            >
              <i className="fas fa-plus me-1"></i>
              {formatCurrency(100000)}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Bid Input */}
      <div className="custom-bid-section">
        <div className="row g-2">
          <div className="col-8">
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                placeholder="Oferta personalizada"
                value={customBid}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                min={currentBid + 1000}
                step="1000"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleCustomBid}
              disabled={isLoading || !customBid}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              ) : (
                <i className="fas fa-gavel me-1"></i>
              )}
              Ofertar
            </button>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-sm mt-2 mb-0">
          <small>{error}</small>
        </div>
      )}
      
      <div className="bidding-instructions mt-3">
        <small className="text-muted">
        </small>
      </div>
    </div>
  );
};

export default BiddingInterface;