export const sellConfirmationConfig = {
  // data
  data: {
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
  }
};