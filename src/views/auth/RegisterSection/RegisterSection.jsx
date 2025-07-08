import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startRegistro } from '../../../redux/features/auth/thunks';
import { consLogged } from '../../../const/consLogged';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import { authConfig } from '../authConfig';

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingLogin, logged } = useSelector(state => state.userReducer);
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
    
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
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
    
    if (!agreeTerms) {
      newErrors.terms = 'Debes aceptar los términos de servicio';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      dispatch(startRegistro(formData));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Breadcrumb 
        title="Crear Cuenta"
        currentPage="Crear Cuenta"
      />
      
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src="/assets/img/logo/logo.png" alt="" />
                <p>Crea tu cuenta en Unique Motors</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    disabled={loadingLogin}
                  />
                  {errors.nombre && (
                    <small className="text-danger">{errors.nombre}</small>
                  )}
                </div>
                
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
                
                <div className="form-check form-group">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    id="agree"
                    disabled={loadingLogin}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Acepto los <Link to="/terms">Términos de Servicio</Link>
                  </label>
                  {errors.terms && (
                    <small className="text-danger d-block">{errors.terms}</small>
                  )}
                </div>
                
                <div className="d-flex align-items-center">
                  <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={loadingLogin}
                  >
                    {loadingLogin ? (
                      <>
                        <i className="far fa-spinner fa-spin"></i> Creating account...
                      </>
                    ) : (
                      <>
                        <i className="far fa-paper-plane"></i> Crear Cuenta
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="login-footer">
                <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
                <div className="social-login">
                  <p>Registrarse con redes sociales</p>
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

export default RegisterSection;