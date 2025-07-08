import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/features/auth/userSlice';
import { consLogged } from '../const/consLogged';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { logged, user } = useSelector(state => state.userReducer);
  const isLoggedIn = logged === consLogged.LOGGED;

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };


  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className="header">
      {/* top header */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-wrapper">
            <div className="header-top-left">
              <div className="header-top-contact">
                <ul>
                  <li>
                    <div className="header-top-contact-icon">
                      <img src="/assets/img/icon/mail.svg" alt="" />
                    </div>
                    <div className="header-top-contact-info">
                      <a href="mailto:info@uniquemotors.com">info@uniquemotors.mx</a>
                    </div>
                  </li>
                  <li>
                    <div className="header-top-contact-icon">
                      <img src="/assets/img/icon/clock.svg" alt="" />
                    </div>
                    <div className="header-top-contact-info">
                      <a href="#">Lun - Vie (08AM - 10PM)</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header-top-right">
              <div className="header-top-social">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main navigation */}
      <div className="main-navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="container custom-nav">
            <Link className="navbar-brand" to="/">
              <img className="logo-img" src="/assets/img/logo/unique-motors-vertical.png" alt="logo" />
            </Link>
            
            <div className="mobile-menu-right">
              <div className="header-account header-mobile-account">
                <div className="dropdown">
                  <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="far fa-user-circle"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {isLoggedIn ? (
                      <>
                        <li><Link className="dropdown-item" to="/profile"><i className="far fa-user"></i> My Profile</Link></li>
                        <li><Link className="dropdown-item" to="/billing"><i className="far fa-clipboard-list"></i> Billing Info</Link></li>
                        <li><Link className="dropdown-item" to="/settings"><i className="far fa-cog"></i> Settings</Link></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className="far fa-sign-out"></i> Cerrar Sesión</a></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login"><i className="far fa-sign-in"></i> Iniciar Sesión</Link></li>
                        <li><Link className="dropdown-item" to="/register"><i className="far fa-user-plus"></i> Crear Cuenta</Link></li>
                        <li><Link className="dropdown-item" to="/about"><i className="far fa-info-circle"></i> Nosotros</Link></li>
                        <li><Link className="dropdown-item" to="/contact"><i className="far fa-envelope"></i> Contacto</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <button 
                className="navbar-toggler" 
                type="button" 
                onClick={handleNavCollapse}
                aria-expanded={!isNavCollapsed} 
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-mobile-icon"><i className="far fa-bars"></i></span>
              </button>
            </div>

            <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/')}`} to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/vender')}`} to="/vender">
                    Vender
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/about')}`} to="/about">
                    Nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
                    Contacto
                  </Link>
                </li>
              </ul>
              
              <div className="header-nav-right">
                <div className="header-phone">
                  <div className="header-phone-icon">
                    <img src="/assets/img/icon/phone.svg" alt="" />
                  </div>
                  <div className="header-phone-content">
                    <span>¿Necesitas Subastar tu Auto?</span>
                    <h5 className="header-phone-number"><a href="tel:+2123654789">+52 55 37 89 41 66</a></h5>
                  </div>
                </div>
                <div className="header-btn mt-2">
                  <a href="/#cars" className="theme-btn">Ver Subastas</a>
                </div>
                <div className="header-account">
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="far fa-user-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {isLoggedIn ? (
                        <>
                          <li><Link className="dropdown-item" to="/profile"><i className="far fa-user"></i> Mi Perfil</Link></li>
                          <li><Link className="dropdown-item" to="/profile/listings"><i className="far fa-car"></i> Mis Subastas</Link></li>
                          <li><Link className="dropdown-item" to="/profile/transactions"><i className="far fa-repeat"></i> Transacciones</Link></li>
                          <li><Link className="dropdown-item" to="/profile/settings"><i className="far fa-cog"></i> Configuración</Link></li>
                          <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className="far fa-sign-out"></i> Cerrar Sesión</a></li>
                        </>
                      ) : (
                        <>
                          <li><Link className="dropdown-item" to="/login"><i className="far fa-sign-in"></i> Iniciar Sesión</Link></li>
                          <li><Link className="dropdown-item" to="/register"><i className="far fa-user-plus"></i> Registro</Link></li>
                          <li><Link className="dropdown-item" to="/about"><i className="far fa-info-circle"></i> Acerca de</Link></li>
                          <li><Link className="dropdown-item" to="/contact"><i className="far fa-envelope"></i> Contacto</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;