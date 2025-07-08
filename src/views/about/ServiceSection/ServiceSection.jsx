import React from 'react';

// data
const serviceData = {
  heading: {
    tagline: "Nuestros Servicios",
    title: {
      before: "¿Qué",
      highlight: "Ofrecemos?"
    }
  },
  services: [
    {
      count: "01",
      icon: "assets/img/icon/car-rent-2.svg",
      iconAlt: "Subastas de Vehículos",
      title: "Subastas de Vehículos",
      description: "Participa en subastas transparentes de vehículos verificados. Sistema seguro con tokens que garantiza la equidad en cada proceso.",
      link: "#",
      button: {
        text: "Leer Más",
        link: "#"
      }
    },
    {
      count: "02",
      icon: "assets/img/icon/money.svg",
      iconAlt: "Sistema de Tokens",
      title: "Sistema de Tokens",
      description: "Compra tokens para participar en subastas. Sistema seguro, transparente y fácil de usar para todas tus transacciones.",
      link: "/pricing",
      button: {
        text: "Comprar Tokens",
        link: "/pricing"
      }
    },
    {
      count: "03",
      icon: "assets/img/icon/quality-service.svg",
      iconAlt: "Verificación de Vehículos",
      title: "Verificación de Vehículos",
      description: "Todos nuestros vehículos pasan por un riguroso proceso de verificación técnica y legal antes de ser incluidos en las subastas.",
      link: "#",
      button: {
        text: "Leer Más",
        link: "#"
      }
    },
    {
      count: "04",
      icon: "assets/img/icon/booking.svg",
      iconAlt: "Venta de Vehículos",
      title: "Venta de Vehículos",
      description: "¿Quieres vender tu vehículo? Te ayudamos a ponerlo en subasta y obtener el mejor precio del mercado de forma rápida y segura.",
      link: "/sell",
      button: {
        text: "Vender Auto",
        link: "/sell"
      }
    },
    {
      count: "05",
      icon: "assets/img/icon/staff.svg",
      iconAlt: "Soporte 24/7",
      title: "Soporte 24/7",
      description: "Nuestro equipo de expertos está disponible las 24 horas para ayudarte en todo el proceso de subasta y responder tus dudas.",
      link: "/contact",
      button: {
        text: "Contactar",
        link: "/contact"
      }
    },
    {
      count: "06",
      icon: "assets/img/icon/online-payment.svg",
      iconAlt: "Pagos Seguros",
      title: "Pagos Seguros",
      description: "Procesamos todos los pagos de forma segura con los más altos estándares de seguridad y encriptación para proteger tu información.",
      link: "#",
      button: {
        text: "Leer Más",
        link: "#"
      }
    }
  ]
};

const ServiceSection = () => {
  // render
  return (
    <div id="servicios" className="service-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{serviceData.heading.tagline}</span>
              <h2 className="site-title">
                {serviceData.heading.title.before} <span>{serviceData.heading.title.highlight}</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {serviceData.services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="service-item">
                <span className="service-count">{service.count}</span>
                <div className="service-icon">
                  <img src={service.icon} alt={service.iconAlt} />
                </div>
                <div className="service-content">
                  <h3 className="service-title">
                    <a href={service.link}>{service.title}</a>
                  </h3>
                  <p className="service-text">
                    {service.description}
                  </p>
                  <div className="service-arrow">
                    <a href={service.button.link} className="theme-btn">
                      {service.button.text} <i className="far fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;