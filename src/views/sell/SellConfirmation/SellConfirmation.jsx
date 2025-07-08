import React from 'react';

// data
const sellConfirmationData = {
  confirmation: {
    title: "Tu Vehículo Ha Sido Registrado",
    description: "Tu solicitud ha sido recibida exitosamente. Nuestro equipo revisará la información y se pondrá en contacto contigo dentro de las próximas 24 horas para programar la verificación del vehículo.",
    button: "Registrar Otro Vehículo"
  },
  summary: {
    title: "Resumen de Envío",
    orderId: "SV" + Date.now().toString().slice(-6),
    printButton: "Imprimir Resumen",
    sections: {
      carInfo: {
        title: "Información del Vehículo",
        fields: {
          brand: "Marca",
          model: "Modelo", 
          year: "Año",
          fuel: "Combustible",
          transmission: "Transmisión"
        }
      },
      carDetails: {
        title: "Detalles del Vehículo",
        fields: {
          mileage: "Kilometraje",
          color: "Color",
          engine: "Motor",
          price: "Precio Estimado"
        }
      },
      personalInfo: {
        title: "Información de Contacto",
        fields: {
          name: "Nombre",
          email: "Email",
          phone: "Teléfono"
        }
      },
      submissionInfo: {
        title: "Información del Envío",
        fields: {
          submissionId: "ID de Envío",
          status: "Estado",
          submissionDate: "Fecha de Envío",
          images: "Imágenes"
        },
        statusValue: "En Revisión",
        imagesUnit: "archivos"
      }
    }
  }
};

const SellConfirmation = ({ formData, onNewSubmission }) => {
  // handlers
  const handlePrint = () => {
    window.print();
  };

  // render
  return (
    <div className="booking-confirm py-120">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="booking-confirm-content">
              <i className="far fa-check"></i>
              <h3>{sellConfirmationData.confirmation.title}</h3>
              <p>{sellConfirmationData.confirmation.description}</p>
              <button onClick={onNewSubmission} className="theme-btn">
                {sellConfirmationData.confirmation.button}
              </button>
            </div>
          </div>
          <div className="col-md-8 mx-auto mt-5">
            <div className="booking-summary">
              <h3>{sellConfirmationData.summary.title} (#{sellConfirmationData.summary.orderId})</h3>
              <div className="booking-summary-content">
                <div className="row g-5">
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.carInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.brand} <span>{formData.marca || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.model} <span>{formData.modelo || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.year} <span>{formData.año || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.fuel} <span>{formData.combustible || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.transmission} <span>{formData.transmision || 'N/A'}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.carDetails.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.mileage} <span>{formData.kilometraje || 'N/A'} km</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.color} <span>{formData.color || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.engine} <span>{formData.motor || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.price} <span>${formData.precio || 'N/A'}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.personalInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.name} <span>{formData.nombre || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.email} <span>{formData.email || 'N/A'}</span></li>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.phone} <span>{formData.telefono || 'N/A'}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.submissionInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.submissionId} <span>#{sellConfirmationData.summary.orderId}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.status} <span className="text-warning">{sellConfirmationData.summary.sections.submissionInfo.statusValue}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.submissionDate} <span>{new Date().toLocaleDateString('es-ES')}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.images} <span>{formData.images?.length || 0} {sellConfirmationData.summary.sections.submissionInfo.imagesUnit}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handlePrint} className="theme-btn">
                {sellConfirmationData.summary.printButton} <i className="far fa-print"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellConfirmation;