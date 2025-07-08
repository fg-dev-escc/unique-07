import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { carTabsConfig } from './carTabsConfig';
import { detailConfig } from '../detailConfig';
import { useCarDetail } from '../hooks/useCarDetail';
import { consLogged } from '../../../const/consLogged';

const CarTabs = () => {
  // hooks
  const { car } = useCarDetail();
  const [activeTab, setActiveTab] = useState('description');
  
  // config
  const { data } = carTabsConfig;
  const { helpers } = detailConfig;
  
  // redux state
  const { logged } = useSelector(state => state.userReducer);
  const isAuthenticated = logged === consLogged.LOGGED;

  if (!car) return null;

  const timeLeft = helpers.getTimeLeft(car.fechaFin);
  const isActive = timeLeft !== 'Subasta terminada';

  // Agrupar especificaciones por categoría desde car.valores
  const detallesVehiculoCampos = [
    'Marca', 'Version', 'Submarca', 'Modelo', 'Origen', 'Carrocería', 'Edición Especial', 'Pais de Origen', 'Combustible', 'Transmision', 'Km', 'No Dueños', 'Motor', 'Color', 'Potencia', 'Torque', 'Cilindrada', 'Velocidad Máxima', 'Aceleración', 'Tipo de Tracción', 'Suspensión', 'Frenos'
  ];
  const detallesVehiculo = car && car.valores ? car.valores.filter(spec => detallesVehiculoCampos.includes(spec.campo)) : [];
  const infoAdicional = car && car.valores ? car.valores.filter(spec => !detallesVehiculoCampos.includes(spec.campo)) : [];

  return (
    <div className="container">
      <div className="car-single-details pt-50">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button 
              className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
              id="nav-tab1" 
              onClick={() => setActiveTab('description')}
              type="button" 
              role="tab" 
              aria-controls="tab1" 
              aria-selected={activeTab === 'description'}
            >
              Descripción
            </button>
            <button 
              className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`}
              id="nav-tab2" 
              onClick={() => setActiveTab('additional')}
              type="button" 
              role="tab" 
              aria-controls="tab2" 
              aria-selected={activeTab === 'additional'}
            >
              Información Adicional
            </button>
            <button 
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              id="nav-tab3" 
              onClick={() => setActiveTab('reviews')}
              type="button" 
              role="tab" 
              aria-controls="tab3" 
              aria-selected={activeTab === 'reviews'}
            >
              Comentarios (05)
            </button>
            <button 
              className={`nav-link ${activeTab === 'bidding' ? 'active' : ''}`}
              id="nav-tab4" 
              onClick={() => setActiveTab('bidding')}
              type="button" 
              role="tab" 
              aria-controls="tab4" 
              aria-selected={activeTab === 'bidding'}
            >
              Historial de Ofertas (08)
            </button>
          </div>
        </nav>
        
        <div className="tab-content" id="nav-tabContent">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-tab1">
              <div className="car-single-desc">
                {detallesVehiculo.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Especificaciones técnicas</h5>
                      <ul className="list-unstyled">
                        {detallesVehiculo.slice(0, Math.ceil(detallesVehiculo.length / 2)).map(spec => (
                          <li key={spec.campo} className="mb-1">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5>Características adicionales</h5>
                      <ul className="list-unstyled">
                        {detallesVehiculo.slice(Math.ceil(detallesVehiculo.length / 2)).map(spec => (
                          <li key={spec.campo} className="mb-1">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>
                    Este vehículo se encuentra en excelente estado de conservación. Ha sido mantenido regularmente y cuenta con todos los servicios al día. Ideal para uso personal o familiar. La subasta incluye documentación completa y transferencia de propiedad.
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Additional Info Tab */}
          {activeTab === 'additional' && (
            <div className="tab-pane fade show active" id="tab2" role="tabpanel" aria-labelledby="nav-tab2">
              <div className="car-single-additional-info">
                {infoAdicional.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        {infoAdicional.slice(0, Math.ceil(infoAdicional.length / 2)).map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        {infoAdicional.slice(Math.ceil(infoAdicional.length / 2)).map(spec => (
                          <li key={spec.campo} className="mb-2">
                            <strong>{spec.campo}:</strong> {spec.valor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
                
                {/* Descripción del vehículo movida aquí */}
                {car.descripcion && (
                  <div className="mt-3">
                    <h5>Descripción del vehículo</h5>
                    <p>{car.descripcion}</p>
                  </div>
                )}
                
                {/* Información adicional de la API */}
                {car.informacionAdicional && (
                  <div className="mt-3">
                    <h6>Información adicional</h6>
                    <p>{car.informacionAdicional}</p>
                  </div>
                )}
                
                {car.observaciones && (
                  <div className="mt-3">
                    <h6>Observaciones</h6>
                    <p>{car.observaciones}</p>
                  </div>
                )}
                
                {car.historialMantenimiento && (
                  <div className="mt-3">
                    <h6>Historial de mantenimiento</h6>
                    <p>{car.historialMantenimiento}</p>
                  </div>
                )}
                
                {car.condicionesVenta && (
                  <div className="mt-3">
                    <h6>Condiciones de venta</h6>
                    <p>{car.condicionesVenta}</p>
                  </div>
                )}
                
                {car.garantia && (
                  <div className="mt-3">
                    <h6>Garantía</h6>
                    <p>{car.garantia}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'reviews' && (
            <div className="tab-pane fade show active" id="tab3" role="tabpanel" aria-labelledby="nav-tab3">
              <div className="car-single-review">
                <div className="blog-comments">
                  <h3>Comentarios (05)</h3>
                  
                  <div className="blog-comments-wrapper">
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Carlos Mendoza</h5>
                        <span><i className="far fa-clock"></i> 17 Marzo, 2024</span>
                        <p>Excelente vehículo, se ve en muy buen estado. Las fotografías muestran claramente el cuidado que ha tenido. Definitivamente consideraré participar en esta subasta.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-2.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Maria Rodriguez</h5>
                        <span><i className="far fa-clock"></i> 16 Marzo, 2024</span>
                        <p>¿Podrían proporcionar más detalles sobre el historial de mantenimiento? Me interesa mucho este modelo y quiero asegurarme de que esté en óptimas condiciones.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-3.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Jose García</h5>
                        <span><i className="far fa-clock"></i> 15 Marzo, 2024</span>
                        <p>Muy buena opción para la familia. El precio base parece justo considerando las características del vehículo. Estaré pendiente de la subasta.</p>
                        <a href="#"><i className="far fa-reply"></i> Responder</a>
                      </div>
                    </div>
                  </div>

                  <div className="blog-comments-form">
                    <h3>Dejar un Comentario</h3>
                    {!isAuthenticated ? (
                      <div className="alert alert-info text-center">
                        <i className="fas fa-info-circle fs-2 mb-3"></i>
                        <h5>Inicia sesión para comentar</h5>
                        <p className="mb-3">Para dejar comentarios necesitas tener una cuenta activa</p>
                        <a href="/login" className="theme-btn me-2">
                          <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </a>
                        <a href="/register" className="theme-btn theme-btn-outline">
                          <i className="fas fa-user-plus"></i> Registrarse
                        </a>
                      </div>
                    ) : (
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Tu Nombre*" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input type="email" className="form-control" placeholder="Tu Email*" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea className="form-control" rows="5" placeholder="Tu Comentario*" />
                            </div>
                            <button type="submit" className="theme-btn">
                              <i className="far fa-paper-plane"></i> Enviar Comentario
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Bidding History Tab */}
          {activeTab === 'bidding' && (
            <div className="tab-pane fade show active" id="tab4" role="tabpanel" aria-labelledby="nav-tab4">
              <div className="car-single-review">
                <div className="blog-comments">
                  <h3>Historial de Pujas (08)</h3>
                  
                  <div className="auction-summary mb-4 p-3 bg-light rounded">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Puja Actual:</strong><br />
                        <span className="text-primary fs-5">{helpers.formatPrice(car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Puja Inicial:</strong><br />
                        <span>{helpers.formatPrice(car.precioInicial || car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Precio Reserva:</strong><br />
                        <span>{helpers.formatPrice(car.precioReserva || car.precio)}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Tiempo Restante:</strong><br />
                        <span className="text-danger">{timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  <div className="blog-comments-wrapper">
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***23</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:30</span>
                        <p>
                          <strong>Monto de la puja: {helpers.formatPrice(28500000)}</strong>
                          <span className="text-success ms-2">
                            <i className="fas fa-trophy"></i> Puja ganadora actual
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-2.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***67</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:28</span>
                        <p><strong>Monto de la puja: {helpers.formatPrice(28000000)}</strong></p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-3.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***45</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:25</span>
                        <p><strong>Monto de la puja: {helpers.formatPrice(27500000)}</strong></p>
                      </div>
                    </div>
                    
                    <div className="blog-comments-single">
                      <img src="/assets/img/blog/com-1.jpg" alt="thumb" />
                      <div className="blog-comments-content">
                        <h5>Usuario***89</h5>
                        <span><i className="far fa-clock"></i> 15/03/2024 14:22</span>
                        <p><strong>Monto de la puja: {helpers.formatPrice(27000000)}</strong></p>
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="blog-comments-form">
                      <h3>Realizar Puja</h3>
                      {!isAuthenticated ? (
                        <div className="alert alert-warning text-center">
                          <i className="fas fa-sign-in-alt fs-2 mb-3"></i>
                          <h5>Debes ingresar para hacer una oferta</h5>
                          <p className="mb-3">Para participar en las subastas necesitas tener una cuenta activa</p>
                          <a href="/login" className="theme-btn me-2">
                            <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                          </a>
                          <a href="/register" className="theme-btn theme-btn-outline">
                            <i className="fas fa-user-plus"></i> Registrarse
                          </a>
                        </div>
                      ) : (
                        <div>
                          <div className="alert alert-info">
                            <i className="fas fa-info-circle"></i> 
                            Tu puja debe ser mayor a {helpers.formatPrice(car.precio)}. Incremento mínimo: $500,000
                          </div>
                          
                          <form>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input type="text" className="form-control" placeholder="Tu Nombre*" />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input type="email" className="form-control" placeholder="Tu Email*" />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Monto de la Puja</label>
                                  <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder={`Mínimo: ${helpers.formatPrice(car.precio + 500000)}`}
                                    min={car.precio + 500000}
                                    step="500000"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    placeholder="Comentario opcional sobre tu puja..."
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarTabs;