import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Aquí iría la lógica de suscripción
  };

  return (
    <footer className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row footer-widget-wrapper pt-100 pb-70">
            <div className="col-md-6 col-lg-4">
              <div className="footer-widget-box about-us">
                <Link to="/" className="footer-logo">
                  <img src="/assets/img/logo/unique-motors-vertical.png" alt="" />
                </Link>
                <p className="mb-3">
                  Somos la plataforma líder en subastas de vehículos premium, conectando compradores 
                  y vendedores en un ambiente seguro y transparente desde hace más de 10 años.
                </p>
                <ul className="footer-contact">
                  <li>
                    <a href="tel:+525512345678">
                      <i className="far fa-phone"></i>+52 55 1234 5678
                    </a>
                  </li>
                  <li>
                    <i className="far fa-map-marker-alt"></i>Av. Reforma 123, Ciudad de México
                  </li>
                  <li>
                    <a href="mailto:info@premiumauctions.com">
                      <i className="far fa-envelope"></i>info@premiumauctions.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Enlaces Rápidos</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="/about">
                      <i className="fas fa-caret-right"></i> Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link to="/cars">
                      <i className="fas fa-caret-right"></i> Subastas Activas
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Términos de Servicio
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Política de Privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Nuestro Equipo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Centro de Ayuda</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Centro de Ayuda
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Preguntas Frecuentes
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Guías de Subasta
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-caret-right"></i> Chat en Vivo
                    </a>
                  </li>
                  <li>
                    <Link to="/contact">
                      <i className="fas fa-caret-right"></i> Contáctanos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Boletín Informativo</h4>
                <div className="footer-newsletter">
                  <p>Suscríbete a nuestro boletín para recibir las últimas subastas y noticias del mundo automotriz</p>
                  <div className="subscribe-form">
                    <form onSubmit={handleNewsletterSubmit}>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Tu Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button className="theme-btn" type="submit">
                        Suscribirse <i className="far fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <p className="copyright-text">
                &copy; Copyright {new Date().getFullYear()} <a href="#"> Premium Auto Auctions </a> Todos los Derechos Reservados.
              </p>
            </div>
            <div className="col-md-6 align-self-center">
              <ul className="footer-social">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;