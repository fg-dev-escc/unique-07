export const sellWizardConfig = {
  // data
  data: {
    header: {
      tagline: "Vender Auto",
      title: {
        before: "Publica tu",
        highlight: "Vehículo",
        after: "en 3 pasos"
      },
      description: "Completa la información para que otros usuarios puedan ver tu auto"
    },
    steps: [
      { 
        number: 1, 
        title: 'Datos Personales', 
        icon: 'fas fa-user', 
        description: 'Tu información de contacto' 
      },
      { 
        number: 2, 
        title: 'Información del Auto', 
        icon: 'fas fa-car', 
        description: 'Detalles de tu vehículo' 
      },
      { 
        number: 3, 
        title: 'Fotos y Finalización', 
        icon: 'fas fa-camera', 
        description: 'Sube fotos y completa' 
      }
    ],
    navigation: {
      previous: "Anterior",
      next: "Siguiente",
      submit: "Publicar Auto",
      stepIndicator: "Paso",
      of: "de"
    }
  }
};