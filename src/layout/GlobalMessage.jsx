import { useSelector } from 'react-redux';

export const GlobalMessage = () => {
  const { loading } = useSelector((state) => state.loaderReducer || { loading: false });

  if (loading) {
    return (
      <div className="global-message">
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};