import { Link } from 'react-router-dom';

const SessionMessage = ({ texto, paddingTop = 20 }) => {
  return (
    <div className="session-message" style={{ paddingTop: `${paddingTop}px` }}>
      <div className="alert alert-info text-center">
        <div className="mb-3">
          <i className="fas fa-info-circle fa-2x"></i>
        </div>
        <p className="mb-3">{texto}</p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn btn-outline-primary">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionMessage;