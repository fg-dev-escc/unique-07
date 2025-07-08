// Mocks para comentarios y historial de pujas

export const mockComments = [
  {
    id: 1,
    userName: "María González",
    userImage: "assets/img/blog/com-1.jpg",
    date: "15 Marzo, 2024",
    rating: 5,
    comment: "Excelente vehículo, muy bien cuidado. El proceso de puja fue muy transparente y la comunicación con el vendedor fue perfecta. Totalmente recomendado."
  },
  {
    id: 2,
    userName: "Carlos Rodríguez", 
    userImage: "assets/img/blog/com-2.jpg",
    date: "12 Marzo, 2024",
    rating: 4,
    comment: "Buen auto, aunque tiene algunos detalles menores. El precio final fue justo considerando el estado del vehículo. La entrega fue puntual."
  },
  {
    id: 3,
    userName: "Ana López",
    userImage: "assets/img/blog/com-3.jpg", 
    date: "10 Marzo, 2024",
    rating: 5,
    comment: "Increíble experiencia de compra. El auto superó mis expectativas y el vendedor fue muy honesto con todos los detalles. Definitivamente volvería a comprar aquí."
  },
  {
    id: 4,
    userName: "Diego Silva",
    userImage: "assets/img/blog/com-1.jpg",
    date: "8 Marzo, 2024", 
    rating: 4,
    comment: "Muy satisfecho con la compra. El proceso de puja fue emocionante y justo. El auto llegó exactamente como se describía en las fotos."
  },
  {
    id: 5,
    userName: "Laura Martínez",
    userImage: "assets/img/blog/com-2.jpg",
    date: "5 Marzo, 2024",
    rating: 5,
    comment: "Perfecta transacción de principio a fin. El sistema de pujas es muy intuitivo y el vendedor respondió todas mis preguntas rápidamente."
  }
];

export const mockBiddingHistory = [
  {
    id: 1,
    bidderName: "Usuario***23",
    bidAmount: 28500,
    bidTime: "2024-03-15 14:30:25",
    isWinning: true,
    bidType: "manual"
  },
  {
    id: 2,
    bidderName: "AutoBid***67", 
    bidAmount: 28000,
    bidTime: "2024-03-15 14:28:15",
    isWinning: false,
    bidType: "automatic"
  },
  {
    id: 3,
    bidderName: "Usuario***45",
    bidAmount: 27500,
    bidTime: "2024-03-15 14:25:10",
    isWinning: false,
    bidType: "manual"
  },
  {
    id: 4,
    bidderName: "BidMaster***12",
    bidAmount: 27000,
    bidTime: "2024-03-15 14:20:05",
    isWinning: false,
    bidType: "manual"
  },
  {
    id: 5,
    bidderName: "AutoBid***89",
    bidAmount: 26500,
    bidTime: "2024-03-15 14:15:30",
    isWinning: false,
    bidType: "automatic"
  },
  {
    id: 6,
    bidderName: "Usuario***56",
    bidAmount: 26000,
    bidTime: "2024-03-15 14:10:45",
    isWinning: false,
    bidType: "manual"
  },
  {
    id: 7,
    bidderName: "BidPro***34",
    bidAmount: 25500,
    bidTime: "2024-03-15 14:05:20",
    isWinning: false,
    bidType: "manual"
  },
  {
    id: 8,
    bidderName: "AutoBid***78",
    bidAmount: 25000,
    bidTime: "2024-03-15 14:00:00",
    isWinning: false,
    bidType: "automatic"
  }
];

export const mockAuctionDetails = {
  currentBid: 28500,
  startingBid: 20000,
  reservePrice: 30000,
  bidIncrement: 500,
  totalBids: 8,
  uniqueBidders: 6,
  timeRemaining: "2 días 14 horas 23 minutos",
  auctionEndTime: "2024-03-17 18:00:00",
  auctionStartTime: "2024-03-10 18:00:00"
};