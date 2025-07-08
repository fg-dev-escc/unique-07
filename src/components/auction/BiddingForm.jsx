import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startPuja } from "../../redux/features/auction/thunks";

const MultiploMil = (numero) => numero % 1000 === 0;

export const BiddingForm = () => {
  const dispatch = useDispatch();
  const { subastaTorre } = useSelector(state => state.auctionReducer);
  const { user } = useSelector(state => state.userReducer);
  const [form, setForm] = useState({});
  const [err, setErr] = useState('');
  const [monto, setMonto] = useState('');

  // Calcular ofertas sugeridas (mayor puja actual + incrementos)
  const mayorPuja = subastaTorre?.mayorPuja || 0;
  const ofertasSugeridas = [
    mayorPuja + 1000,
    mayorPuja + 5000,
    mayorPuja + 10000
  ];
    
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    const numValue = parseInt(value) || 0;
    setMonto(value);
    setForm({
      monto: numValue, 
      torreID: subastaTorre?.torreID, 
      usuarioPujaID: user.usuarioID, 
      fecha: new Date()
    });
    setErr('');
  };

  const handleClick = () => {
    if (!MultiploMil(form.monto)) {
      setErr('La oferta debe ser múltiplo de $1,000');
      return;
    }
    if (!form.monto || form.monto <= 0) {
      setErr('La oferta debe ser mayor a 0');
      return;
    }
    dispatch(startPuja(form));
    setErr('');
    setMonto('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handlePresetBid = (amount) => {
    setMonto(amount.toString());
    setForm({
      monto: amount, 
      torreID: subastaTorre?.torreID, 
      usuarioPujaID: user.usuarioID, 
      fecha: new Date()
    });
    setErr('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Solo mostrar si el usuario está logeado
  if (!user?.usuarioID) {
    return (
      <div className="bidding-form">
        <div className="text-center text-muted p-4">
          <i className="fas fa-lock mb-2"></i>
          <p>Inicia sesión para participar en la subasta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bidding-form">
      {/* Botones de ofertas sugeridas */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-10">
          <h6 className="text-center mb-3">Ofertas sugeridas</h6>
          <div className="row g-2">
            {ofertasSugeridas.map((amount, index) => (
              <div key={index} className="col-4">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => handlePresetBid(amount)}
                >
                  {formatCurrency(amount)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input personalizado */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-8">
          <h6 className="text-center mb-3">O ingresa tu oferta</h6>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              name="monto"
              value={monto}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Ingresa tu oferta personalizada"
            />
            <button 
              className="btn btn-success"
              onClick={handleClick}
              disabled={!form.monto || form.monto <= 0}
            >
              <i className="fas fa-gavel me-2"></i>
              Ofertar
            </button>
          </div>
        </div>
      </div>

      {err && (
        <div className="text-center text-warning mb-3">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {err}
        </div>
      )}
    </div>
  );
};

export default BiddingForm;