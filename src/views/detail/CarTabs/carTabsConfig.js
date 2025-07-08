export const carTabsConfig = {
  data: {
    tabs: {
      details: 'Detalles del vehículo',
      additionalInfo: 'Información adicional',
      bidHistory: 'Historial de pujas',
      comments: 'Comentarios'
    },
    labels: {
      bidAmount: 'Monto de Puja',
      placeBid: 'Realizar Puja',
      submitBid: 'Enviar Puja'
    },
    placeholders: {
      bidAmount: 'Ingrese su puja',
      yourName: 'Su nombre',
      yourEmail: 'Su email',
      comment: 'Comentario (opcional)'
    },
    content: {
      comments: [
        {
          author: 'Roberto Silva',
          date: '2024-01-15 12:00',
          comment: '¿El vehículo ha tenido algún accidente?',
          avatar: '/assets/img/user/01.jpg'
        },
        {
          author: 'Vendedor',
          date: '2024-01-15 12:30',
          comment: 'No, el vehículo nunca ha tenido accidentes. Todos los documentos están en orden.',
          avatar: '/assets/img/team/01.jpg',
          isVendor: true
        },
        {
          author: 'Patricia Morales',
          date: '2024-01-15 13:15',
          comment: '¿Cuántos dueños ha tenido?',
          avatar: '/assets/img/user/01.jpg'
        },
        {
          author: 'Vendedor', 
          date: '2024-01-15 13:45',
          comment: 'Ha tenido solo un dueño anterior. Se ha mantenido en excelentes condiciones.',
          avatar: '/assets/img/team/01.jpg',
          isVendor: true
        }
      ],
      bidHistory: [
        {
          bidder: 'Juan Pérez',
          date: '2024-01-15 14:30',
          amount: '$320,000',
          comment: 'Excelente vehículo, muy interesado.',
          avatar: '/assets/img/team/01.jpg'
        },
        {
          bidder: 'María González',
          date: '2024-01-15 15:45',
          amount: '$335,000',
          comment: 'Perfecto para lo que necesito.',
          avatar: '/assets/img/team/02.jpg'
        },
        {
          bidder: 'Carlos Rodríguez',
          date: '2024-01-15 16:20',
          amount: '$350,000',
          comment: 'Mi oferta final.',
          avatar: '/assets/img/team/03.jpg'
        },
        {
          bidder: 'Ana Martínez',
          date: '2024-01-15 17:10',
          amount: '$365,000',
          comment: 'Realmente lo quiero.',
          avatar: '/assets/img/team/04.jpg'
        },
        {
          bidder: 'Luis López',
          date: '2024-01-15 18:00',
          amount: '$380,000',
          comment: 'Última puja del día.',
          avatar: '/assets/img/team/05.jpg'
        }
      ]
    }
  }
};