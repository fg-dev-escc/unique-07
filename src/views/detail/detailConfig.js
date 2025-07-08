export const detailConfig = {
  // data
  data: {
    breadcrumb: {
      title: "Detalle de Subasta",
      currentPage: "Detalle de Subasta"
    },
    labels: {
      // auction specific
      activeAuction: "Subasta Activa",
      auctionEnded: "Subasta Terminada",
      timeRemaining: "Tiempo Restante",
      currentBid: "/ puja actual",
      placeBid: "Hacer Puja",
      submitBid: "Enviar Puja",
      bidAmount: "Monto de Puja",
      bidHistory: "Historial de Pujas",
      auctionTerms: "Términos de Subasta",
      seller: "Vendedor",
      transferFee: "Comisión de Transferencia",
      dispositionFee: "Comisión de Disposición",
      shareAuction: "Compartir Subasta",
      viewAuction: "Ver Subasta",
      
      // car details
      carDetails: "Detalles del Vehículo",
      model: "Modelo",
      people: "Personas",
      customerReviews: "4 Reseñas de Clientes",
      
      // navigation
      youMayLike: "También Te Puede Interesar",
      viewMore: "Ver Más"
    },
    tabs: {
      description: "Descripción",
      additionalInfo: "Información Adicional", 
      bidHistory: "Historial de Pujas"
    },
    placeholders: {
      bidAmount: "Ingresa tu puja (mínimo $251,000)",
      yourName: "Tu Nombre*",
      yourEmail: "Tu Email*",
      comment: "Comentario (opcional)"
    },
    content: {
      descriptionText: "Este vehículo se encuentra en excelente estado de conservación. Ha sido mantenido regularmente y cuenta con todos los servicios al día. Ideal para uso personal o familiar. La subasta incluye documentación completa y transferencia de propiedad.",
      additionalInfoText: "Vehículo verificado por nuestros expertos. Incluye garantía de 3 meses en motor y transmisión. La puja ganadora debe completar el pago en un plazo máximo de 48 horas. Se aceptan financiamientos bancarios y pagos de contado.",
      bidHistory: [
        {
          bidder: "Carlos Martínez",
          date: "17 Marzo, 2024",
          amount: "$248,000",
          comment: "Excelente vehículo, muy interesado en adquirirlo.",
          avatar: "/assets/img/blog/com-1.jpg"
        },
        {
          bidder: "Ana Rodríguez", 
          date: "17 Marzo, 2024",
          amount: "$245,000",
          comment: "Me parece una gran oportunidad de inversión.",
          avatar: "/assets/img/blog/com-2.jpg"
        },
        {
          bidder: "Miguel Torres",
          date: "16 Marzo, 2024", 
          amount: "$240,000",
          comment: "Vehículo en muy buen estado, dispuesto a pujar.",
          avatar: "/assets/img/blog/com-3.jpg"
        }
      ],
      relatedCars: [
        {
          name: "Honda Civic 2021",
          model: "2021",
          capacity: "5",
          fuel: "Híbrido",
          efficiency: "16.2km / 1-litro",
          transmission: "Automático",
          price: 280000,
          rating: "5.0",
          image: "/assets/img/car/02.jpg"
        },
        {
          name: "Nissan Sentra 2020",
          model: "2020", 
          capacity: "5",
          fuel: "Gasolina",
          efficiency: "14.8km / 1-litro",
          transmission: "Automático",
          price: 220000,
          rating: "4.8",
          image: "/assets/img/car/03.jpg"
        },
        {
          name: "Mazda 3 2022",
          model: "2022",
          capacity: "5", 
          fuel: "Híbrido",
          efficiency: "17.1km / 1-litro",
          transmission: "Automático",
          price: 320000,
          rating: "5.0",
          image: "/assets/img/car/04.jpg"
        }
      ]
    }
  },

  // helpers
  helpers: {
    formatPrice: (price) => {
      return price ? `$${Number(price).toLocaleString('es-MX')}` : '$0';
    },

    getTimeLeft: (fechaFin) => {
      if (!fechaFin) return 'Sin fecha límite';
      const end = new Date(fechaFin);
      const now = new Date();
      let diff = end - now;
      
      if (diff <= 0) return 'Subasta terminada';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);
      
      const pad = (n) => n.toString().padStart(2, '0');
      return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    },

    calculateMinimumBid: (currentPrice) => {
      return currentPrice + 1000; // Incremento mínimo de $1,000
    },

    validateBid: (bidAmount, currentPrice) => {
      const minBid = detailConfig.helpers.calculateMinimumBid(currentPrice);
      return {
        isValid: bidAmount >= minBid,
        message: bidAmount < minBid ? `La puja mínima es ${detailConfig.helpers.formatPrice(minBid)}` : ''
      };
    }
  }
};