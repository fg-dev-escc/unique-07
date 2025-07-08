import { formatCurrency } from "../../utils/formatCurrency";
import { crearFechaConMinutos } from "../../utils/createDateString";

export const BiddingList = ({ pujas }) => {
  if (!pujas || pujas.length === 0) {
    return (
      <div className="bidding-list">
        <div className="text-center text-muted">
          No hay pujas disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="bidding-list">
      <h6 className="mb-3">Pujas Recientes</h6>
      <div className="list-group">
        {pujas.map((puja, index) => (
          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{formatCurrency(puja.Monto)}</strong>
              <small className="text-muted d-block">
                {puja.UsuarioPujaID} • {crearFechaConMinutos(puja.Fecha)}
              </small>
            </div>
            {index === 0 && (
              <span className="badge bg-success">Mejor oferta</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiddingList;