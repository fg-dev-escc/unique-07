import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLogin } from '../../../redux/features/auth/thunks';
import { consLogged } from '../../../const/consLogged';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { authConfig } from '../authConfig';

const LoginSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loginErr, loadingLogin, logged } = useSelector(state => state.userReducer);
  const { data } = authConfig;
  
  // Redirect to home if already logged in
  React.useEffect(() => {
    if (logged === consLogged.LOGGED) {
      navigate('/');
    }
  }, [logged, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      dispatch(startLogin(formData));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Breadcrumb 
        title="Iniciar Sesión"
        currentPage="Iniciar Sesión"
      />
      
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="/assets/img/logo/logo.png" alt="" />
                <p>Inicia sesión en tu cuenta de Unique Motors</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Tu correo electrónico"
                    disabled={loadingLogin}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Tu contraseña"
                    disabled={loadingLogin}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                
                {loginErr && (
                  <div className="alert alert-danger mb-3">
                    <i className="far fa-exclamation-triangle me-2"></i>
                    {loginErr}
                  </div>
                )}
                
                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      id="remember"
                      disabled={loadingLogin}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Recordarme
                    </label>
                  </div>
                  <Link to="/forgot-password" className="forgot-pass">¿Olvidaste tu contraseña?</Link>
                </div>
                
                <div className="d-flex align-items-center">
                  <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={loadingLogin}
                  >
                    {loadingLogin ? (
                      <>
                        <i className="far fa-spinner fa-spin"></i> Signing in...
                      </>
                    ) : (
                      <>
                        <i className="far fa-sign-in"></i> Iniciar Sesión
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="login-footer">
                <p>¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
                <div className="social-login">
                  <p>Continuar con redes sociales</p>
                  <div className="social-login-list">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-google"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSection;