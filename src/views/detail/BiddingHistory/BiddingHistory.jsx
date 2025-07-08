import React, { useState } from 'react';
import { mockBiddingHistory, mockAuctionDetails } from '../../../mocks';
import { optimizeBidHistory } from '../../../../../utils/auctionDataOptimizer';
import './BiddingHistory.css';

const BiddingHistory = ({ carPrice, isActive = true }) => {
  const [biddingHistory, setBiddingHistory] = useState(mockBiddingHistory);
  const [auctionDetails, setAuctionDetails] = useState(mockAuctionDetails);
  const [optimizedBidData, setOptimizedBidData] = useState(() => 
    optimizeBidHistory(mockBiddingHistory)
  );
  const [newBid, setNewBid] = useState({
    bidAmount: '',
    bidderName: '',
    bidderEmail: '',
    comment: ''
  });
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (newBid.bidAmount && newBid.bidderName && newBid.bidderEmail) {
      const bidAmount = parseInt(newBid.bidAmount);
      
      if (bidAmount <= auctionDetails.currentBid) {
        alert(`La puja debe ser mayor a ${formatCurrency(auctionDetails.currentBid)}`);
        return;
      }

      const bid = {
        id: biddingHistory.length + 1,
        bidderName: newBid.bidderName.substring(0, 3) + "***" + Math.floor(Math.random() * 100),
        bidAmount: bidAmount,
        bidTime: new Date().toISOString(),
        isWinning: true,
        bidType: "manual"
      };

      const updatedHistory = biddingHistory.map(h => ({ ...h, isWinning: false }));
      setBiddingHistory([bid, ...updatedHistory]);
      
      setAuctionDetails({
        ...auctionDetails,
        currentBid: bidAmount,
        totalBids: auctionDetails.totalBids + 1
      });

      setNewBid({ bidAmount: '', bidderName: '', bidderEmail: '', comment: '' });
    }
  };

  const getBidTypeIcon = (bidType) => {
    return bidType === 'automatic' ? 'fas fa-robot' : 'fas fa-user';
  };

  const getBidTypeLabel = (bidType) => {
    return bidType === 'automatic' ? 'Puja Automática' : 'Puja Manual';
  };

  return (
    <div className="car-single-review">
      <div className="blog-comments">
        <h3>Historial de Pujas ({auctionDetails.totalBids})</h3>
        
        <div className="auction-summary mb-4 p-3 bg-light rounded">
          <div className="row">
            <div className="col-md-3">
              <strong>Puja Actual:</strong><br />
              <span className="text-primary fs-5">{formatCurrency(auctionDetails.currentBid)}</span>
            </div>
            <div className="col-md-3">
              <strong>Puja Inicial:</strong><br />
              <span>{formatCurrency(auctionDetails.startingBid)}</span>
            </div>
            <div className="col-md-3">
              <strong>Precio Reserva:</strong><br />
              <span>{formatCurrency(auctionDetails.reservePrice)}</span>
            </div>
            <div className="col-md-3">
              <strong>Tiempo Restante:</strong><br />
              <span className="text-danger">{auctionDetails.timeRemaining}</span>
            </div>
          </div>
          
          {/* Optimized bid statistics */}
          <div className="row mt-3 pt-3 border-top">
            <div className="col-md-4">
              <small className="text-muted">Total de Pujas:</small><br />
              <strong>{optimizedBidData.estadisticas.totalBids}</strong>
            </div>
            <div className="col-md-4">
              <small className="text-muted">Participantes Únicos:</small><br />
              <strong>{optimizedBidData.estadisticas.uniqueBidders}</strong>
            </div>
            <div className="col-md-4">
              <small className="text-muted">Puja Promedio:</small><br />
              <strong>{formatCurrency(optimizedBidData.estadisticas.averageBid)}</strong>
            </div>
          </div>
        </div>

        <div className="blog-comments-wrapper">
          {biddingHistory.map((bid) => (
            <div key={bid.id} className="blog-comments-single">
              <div className="bid-avatar-container">
                <i className={`${getBidTypeIcon(bid.bidType)} fs-3 text-primary`}></i>
                {bid.isWinning && (
                  <span className="winning-bid-badge position-absolute top-0 start-100 translate-middle">
                    Ganando
                  </span>
                )}
              </div>
              <div className="blog-comments-content">
                <h5>
                  {bid.bidderName}
                  <span className={`bid-type-label ms-2 ${
                    bid.bidType === 'automatic' ? 'automatic-bid' : 'manual-bid'
                  }`}>
                    {getBidTypeLabel(bid.bidType)}
                  </span>
                </h5>
                <span><i className="far fa-clock"></i> {formatTime(bid.bidTime)}</span>
                <p>
                  <strong>Monto de la puja: {formatCurrency(bid.bidAmount)}</strong>
                  {bid.isWinning && (
                    <span className="text-warning ms-2">
                      <i className="fas fa-trophy"></i> Puja ganadora actual
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isActive && (
          <div className="blog-comments-form">
            <h3>Realizar Puja</h3>
            <div className="alert alert-info">
              <i className="fas fa-info-circle"></i> 
              Tu puja debe ser mayor a {formatCurrency(auctionDetails.currentBid)}. 
              Incremento mínimo: {formatCurrency(auctionDetails.bidIncrement)}
            </div>
            
            <form onSubmit={handleSubmitBid}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Monto de la Puja</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder={`Mínimo: ${formatCurrency(auctionDetails.currentBid + auctionDetails.bidIncrement)}`}
                      value={newBid.bidAmount}
                      onChange={(e) => setNewBid({ ...newBid, bidAmount: e.target.value })}
                      min={auctionDetails.currentBid + auctionDetails.bidIncrement}
                      step={auctionDetails.bidIncrement}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Tu Nombre*"
                      value={newBid.bidderName}
                      onChange={(e) => setNewBid({ ...newBid, bidderName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Tu Email*"
                      value={newBid.bidderEmail}
                      onChange={(e) => setNewBid({ ...newBid, bidderEmail: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Comentario opcional sobre tu puja..."
                      value={newBid.comment}
                      onChange={(e) => setNewBid({ ...newBid, comment: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="theme-btn">
                    <i className="fas fa-gavel"></i> Realizar Puja
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Sección de Información Adicional */}
        <div className="additional-info-section">
          <div 
            className="additional-info-header"
            onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          >
            <h4>Información Adicional</h4>
            <i className={`fas fa-chevron-${showAdditionalInfo ? 'up' : 'down'}`}></i>
          </div>
          
          {showAdditionalInfo && (
            <div className="additional-info-content">
              <h5>Descripción Completa</h5>
              <p>
                Descubre la experiencia de conducir una obra maestra italiana. Este Ferrari 488 Spider 
                combina lo mejor del diseño aerodinámico, la ingeniería de alto rendimiento y el lujo 
                sin compromisos. Un vehículo creado no solo para llegar rápido, sino para hacerlo con 
                estilo y exclusividad.
              </p>
              
              <h5>Observaciones</h5>
              <p>
                Vehículo en excelente estado de conservación. Mantenimientos al día. 
                Documentación completa. Historial de servicios disponible.
              </p>
              
              <h5>Otros Datos</h5>
              <p>
                Incluye llaves originales, manuales de usuario, certificado de autenticidad 
                y garantía extendida. Disponible para inspección previa cita.
              </p>

              <h5>Especificaciones Completas</h5>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><strong>Marca:</strong> Ferrari</li>
                    <li><strong>Modelo:</strong> 2020</li>
                    <li><strong>Submarca:</strong> 430 Spider</li>
                    <li><strong>Origen:</strong> Importado</li>
                    <li><strong>Carrocería:</strong> Convertible</li>
                    <li><strong>País de Origen:</strong> US</li>
                    <li><strong>Combustible:</strong> Gasolina</li>
                    <li><strong>Potencia:</strong> 490hp</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><strong>Torque:</strong> 450Lbp</li>
                    <li><strong>Transmisión:</strong> Manual</li>
                    <li><strong>Color:</strong> Rojo</li>
                    <li><strong>Versión:</strong> 4.3 Spider F1 6vel Sec Al Volante Mt</li>
                    <li><strong>Kilometraje:</strong> 22,300 km</li>
                    <li><strong>Número de Dueños:</strong> 1</li>
                    <li><strong>Motor:</strong> 4.3L V8</li>
                    <li><strong>Edición Especial:</strong> No</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingHistory;