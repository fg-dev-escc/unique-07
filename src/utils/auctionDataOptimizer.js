// Optimized auction data structure
// This utility helps optimize API responses by separating essential data from detailed information

/**
 * Optimizes auction data by separating essential information from detailed information
 * @param {Object} rawAuctionData - Raw auction data from API
 * @returns {Object} Optimized auction data structure
 */
export const optimizeAuctionData = (rawAuctionData) => {
  // Essential data for main display
  const essentialData = {
    numeroTorre: rawAuctionData.numeroTorre,
    torreID: rawAuctionData.torreID,
    fechaFin: rawAuctionData.fechaFin,
    nombre: rawAuctionData.nombre,
    montoSalida: rawAuctionData.montoSalida,
    articuloID: rawAuctionData.articuloID,
    modeloSubasta: rawAuctionData.modeloSubasta,
    tipoVenta: rawAuctionData.tipoVenta,
    estatusJuridico: rawAuctionData.estatusJuridico,
    urlImgPrincipal: rawAuctionData.urlImgPrincipal,
    latLng: rawAuctionData.latLng,
    estado: rawAuctionData.estado,
    categoria: rawAuctionData.categoria,
    subCategoria: rawAuctionData.subCategoria,
    
    // Location summary (simplified)
    ubicacion: {
      calle: rawAuctionData.calle,
      colonia: rawAuctionData.colonia,
      noExt: rawAuctionData.noExt,
      noInt: rawAuctionData.noInt,
      estado: rawAuctionData.estado
    },
    
    // Key specifications only (first 6 most important)
    especificacionesClave: rawAuctionData.valores ? rawAuctionData.valores.slice(0, 6) : [],
    
    // Essential images (first 3)
    imagenesEsenciales: rawAuctionData.imagenes ? rawAuctionData.imagenes.slice(0, 3) : []
  };

  // Additional detailed information (loaded on demand)
  const informacionAdicional = {
    descripcion: rawAuctionData.descripcion,
    observaciones: rawAuctionData.observaciones,
    otrosDatos: rawAuctionData.otrosDatos,
    
    // Complete specifications
    especificacionesCompletas: rawAuctionData.valores || [],
    
    // All images
    imagenesCompletas: rawAuctionData.imagenes || []
  };

  return {
    esencial: essentialData,
    adicional: informacionAdicional
  };
};

/**
 * Optimizes bid history data to reduce payload size
 * @param {Array} bidsHistory - Array of bid history objects
 * @returns {Object} Optimized bid history structure
 */
export const optimizeBidHistory = (bidsHistory) => {
  // Recent bids for immediate display (last 10)
  const recentBids = bidsHistory.slice(0, 10).map(bid => ({
    id: bid.id,
    bidderName: bid.bidderName,
    bidAmount: bid.bidAmount,
    bidTime: bid.bidTime,
    isWinning: bid.isWinning,
    bidType: bid.bidType
  }));

  // Bid statistics
  const estadisticas = {
    totalBids: bidsHistory.length,
    uniqueBidders: [...new Set(bidsHistory.map(b => b.bidderName))].length,
    highestBid: Math.max(...bidsHistory.map(b => b.bidAmount)),
    averageBid: bidsHistory.reduce((sum, bid) => sum + bid.bidAmount, 0) / bidsHistory.length,
    lastBidTime: bidsHistory.length > 0 ? bidsHistory[0].bidTime : null
  };

  return {
    pujasRecientes: recentBids,
    estadisticas: estadisticas,
    // Full history available on demand
    tieneHistorialCompleto: bidsHistory.length > 10
  };
};

/**
 * Creates a lightweight auction summary for list views
 * @param {Object} auctionData - Full auction data
 * @returns {Object} Lightweight auction summary
 */
export const createAuctionSummary = (auctionData) => {
  return {
    torreID: auctionData.torreID,
    nombre: auctionData.nombre,
    montoSalida: auctionData.montoSalida,
    fechaFin: auctionData.fechaFin,
    urlImgPrincipal: auctionData.urlImgPrincipal,
    categoria: auctionData.categoria,
    subCategoria: auctionData.subCategoria,
    estado: auctionData.estado,
    
    // Key specs for preview (only 3 most important)
    especificacionesPreview: auctionData.valores ? 
      auctionData.valores.filter(v => 
        ['Marca', 'Modelo', 'Km'].includes(v.campo)
      ).slice(0, 3) : [],
    
    // Current bid status
    estadoPuja: {
      montoActual: auctionData.montoSalida, // This would be updated with current bid
      tienePujas: false // This would be updated based on bid history
    }
  };
};

/**
 * API response structure recommendation
 */
export const OPTIMIZED_API_STRUCTURE = {
  // GET /api/Auction/Summary/{id} - For list views
  summary: {
    torreID: "string",
    nombre: "string",
    montoSalida: "number",
    fechaFin: "string",
    urlImgPrincipal: "string",
    categoria: "string",
    subCategoria: "string",
    estado: "string",
    especificacionesPreview: "array[3]",
    estadoPuja: {
      montoActual: "number",
      tienePujas: "boolean"
    }
  },
  
  // GET /api/Auction/Essential/{id} - For detail view initial load
  essential: {
    // All essential data without description, full specs, or all images
    // ~60% smaller payload
  },
  
  // GET /api/Auction/Additional/{id} - For detail view on demand
  additional: {
    descripcion: "string", // Large text blocks
    especificacionesCompletas: "array",
    imagenesCompletas: "array",
    observaciones: "string",
    otrosDatos: "string"
  }
};