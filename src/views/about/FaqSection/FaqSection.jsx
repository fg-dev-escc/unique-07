import React from 'react';

// data
const faqData = {
  content: {
    tagline: "Preguntas Frecuentes",
    title: {
      before: "Preguntas",
      highlight: "frecuentes",
      after: "sobre subastas"
    },
    description: "Resolvemos las dudas más comunes sobre nuestro sistema de subastas de vehículos y el uso de tokens. Si tienes más preguntas, no dudes en contactarnos."
  },
  image: {
    src: "assets/img/faq/01.jpg",
    alt: "Preguntas Frecuentes"
  },
  faqs: [
    {
      id: "One",
      question: "¿Cómo funciona el sistema de tokens?",
      answer: "Los tokens son créditos digitales que compras para participar en nuestras subastas. Cada puja consume una cantidad específica de tokens dependiendo del vehículo. Puedes comprar tokens de forma segura desde tu perfil."
    },
    {
      id: "Two",
      question: "¿Cómo puedo registrarme?",
      answer: "El registro es muy sencillo. Solo necesitas proporcionar tu información básica, verificar tu identidad y listo. Una vez registrado, puedes comprar tokens y comenzar a participar en las subastas inmediatamente."
    },
    {
      id: "Three",
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos todas las tarjetas de crédito y débito principales, transferencias bancarias y PSE. Todos los pagos son procesados de forma segura con encriptación de nivel bancario para proteger tu información."
    },
    {
      id: "Four",
      question: "¿Cómo cancelo mi participación?",
      answer: "Puedes retirar tu participación en una subasta siempre y cuando no seas el postor más alto en ese momento. Los tokens utilizados se reembolsarán a tu cuenta. Una vez que eres el ganador, la transacción es final."
    }
  ]
};

const FaqSection = () => {
  // render
  return (
    <div className="faq-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="faq-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  {faqData.content.tagline}
                </span>
                <h2 className="site-title my-3">
                  {faqData.content.title.before} <span>{faqData.content.title.highlight}</span> {faqData.content.title.after}
                </h2>
              </div>
              <p className="about-text">
                {faqData.content.description}
              </p>
              <div className="faq-img mt-3">
                <img src={faqData.image.src} alt={faqData.image.alt} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordion" id="accordionExample">
              {faqData.faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={`heading${faq.id}`}>
                    <button 
                      className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} 
                      type="button" 
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${faq.id}`} 
                      aria-expanded={index === 0 ? 'true' : 'false'} 
                      aria-controls={`collapse${faq.id}`}
                    >
                      <span><i className="far fa-question"></i></span> {faq.question}
                    </button>
                  </h2>
                  <div 
                    id={`collapse${faq.id}`} 
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading${faq.id}`} 
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;