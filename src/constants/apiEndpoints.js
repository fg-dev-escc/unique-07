// API Endpoints basados en OpenAPI Subasta30

export const API_ENDPOINTS = {
  // ===== AUTHENTICATION =====
  AUTH: {
    LOGIN: '/api/Login',
    REFRESH: '/api/Login/Refresh',
    CREATE_COMPRADOR: '/api/Login/CreateComprador',
    GENERA_LIGA_PASSWORD: '/api/Login/GeneraLigaPassword',
    ESTABLECE_PASSWORD: '/api/Login/EstablecePassword'
  },

  // ===== ARTICLES =====
  ARTICULOS: {
    GET_ALL: '/api/Articulos/GetArticulos',
    GET_BY_ID: (id) => `/api/Articulos/GetArticulo/${id}`,
    GET_WEB: '/api/Articulos/GetArticulosWeb',
    GET_WEB_BY_ID: (id) => `/api/Articulos/GetArticuloWeb/${id}`,
    GET_BY_SUBCATEGORIA: (subcategoriaID) => `/api/Articulos/GetArticulosBySubcategoria/${subcategoriaID}`,
    POST: '/api/Articulos/PostArticulo',
    UPDATE: '/api/Articulos/UpdateArticulo',
    DELETE: (id) => `/api/Articulos/DeleteArticulo/${id}`,
    CHANGE_STATUS: '/api/Articulos/CambiaEstatusArticulo',
    GET_HISTORIAL: (id) => `/api/Articulos/GetArticuloHistorial/${id}`,
    POST_HISTORIAL: '/api/Articulos/PostArticuloHistorial',
    
    // Campos dinámicos
    GET_CAMPOS: (id) => `/api/Articulos/GetCamposByArticuloID/${id}`,
    GET_CAMPOS_VALOR: (id) => `/api/Articulos/GetCamposValor/${id}`,
    POST_CAMPOS_VALOR: '/api/Articulos/PostCamposValor',

    // Documentos
    GET_DOCUMENTOS: (id) => `/api/Articulos/GetArticuloDocumentos/${id}`,
    POST_DOCUMENTO: '/api/Articulos/PostDocumentoArticulo',
    GET_DOCUMENTO: (id) => `/api/Articulos/GetArticuloDocumento/${id}`,
    DELETE_DOCUMENTO: (id) => `/api/Articulos/DeleteArticuloDocumento/${id}`,
    GET_IMAGEN: (id) => `/api/Articulos/GetArticuloImagen/${id}`
  },

  // ===== CATEGORIES =====
  CATEGORIAS: {
    GET_ALL: '/api/Categorias/GetCategorias',
    POST: '/api/Categorias/PostCategoria',
    UPDATE: '/api/Categorias/UpdateCategoria',
    DELETE: (id) => `/api/Categorias/DeleCategoria/${id}`,
    
    // Subcategorías
    GET_SUBCATEGORIAS: (categoriaID) => `/api/Categorias/GetSubcategorias/${categoriaID}`,
    POST_SUBCATEGORIA: '/api/Categorias/PostSubcategoria',
    UPDATE_SUBCATEGORIA: '/api/Categorias/UpdateSubcategoria',
    DELETE_SUBCATEGORIA: (id) => `/api/Categorias/DeleSubcategoria/${id}`,

    // Campos
    POST_CAMPO: '/api/Categorias/PostCampo',
    UPDATE_CAMPO: '/api/Categorias/UpdateCampo',
    GET_CAMPOS: (subcategoriaID) => `/api/Categorias/GetCampos/${subcategoriaID}`,
    DELETE_CAMPO: (id) => `/api/Categorias/DeleCampo/${id}`,

    // Listas
    POST_LISTA: '/api/Categorias/PostLista',
    GET_LISTAS: '/api/Categorias/GetListas',
    DELETE_LISTA: (id) => `/api/Categorias/DeleLista/${id}`,
    POST_LISTA_ITEM: '/api/Categorias/PostListaItem',
    GET_LISTA_ITEMS: (listaID) => `/api/Categorias/GetListaItems/${listaID}`,
    DELETE_LISTA_ITEM: (id) => `/api/Categorias/DeleListaItem/${id}`
  },

  // ===== AUCTIONS =====
  SUBASTAS: {
    GET_ALL: '/api/Subastas/GetSubastas',
    GET_BY_ID: (id) => `/api/Subastas/GetSubasta/${id}`,
    POST: '/api/Subastas/PostSubasta',
    EDIT_INICIAL: '/api/Subastas/EditInicial',
    UPDATE_FECHA: '/api/Subastas/UpdateFechaSubasta',
    POST_ARTICULOS: '/api/Subastas/PostArticulosSubasta',
    REMOVER_TORRE: '/api/Subastas/RemoverTorreSubasta',
    GET_TORRES: (subastaID) => `/api/Subastas/GetTorres/${subastaID}`,
    EXTENDER: '/api/Subastas/ExtenderSubasta',

    // Public endpoints
    PUBLIC: {
      GET_ALL: '/api/Subasta/GetSubastas',
      GET_BY_ID: (id) => `/api/Subasta/GetSubasta/${id}`,
      GET_SOLO_SUBASTA: (id) => `/api/Subasta/GetSoloSubasta/${id}`,
      GET_TORRES: (subastaID) => `/api/Subasta/GetTorres/${subastaID}`,
      GET_TORRE: (torreID) => `/api/Subasta/GetTorre/${torreID}`,
      GET_ARTICULO_IMAGEN: (id) => `/api/Subasta/GetArticuloImagen/${id}`,
      GET_ARTICULO_DOCUMENTOS: (id) => `/api/Subasta/GetArticuloDocumentos/${id}`,
      GET_ARTICULO_DOCUMENTO: (id) => `/api/Subasta/GetArticuloDocumento/${id}`
    }
  },

  // ===== BIDDING =====
  PUJAS: {
    PUJAR: '/api/Pujas/Pujar',
    GET_PUJAS_USUARIO: (usuarioID, torreID) => `/api/Pujas/GetPujasUsuario/${usuarioID}/${torreID}`,
    
    // Admin
    ADMIN: {
      GET_PUJAS_TORRE: (torreID) => `/api/AdminPujas/GetPujasTorre/${torreID}`,
      ADJUDICAR: '/api/AdminPujas/AdjudicarTorre',
      NO_ADJUDICAR: '/api/AdminPujas/NoAdjudicarTorre',
      TEST_EMAIL: '/api/AdminPujas/TestEmail'
    }
  },

  // ===== SEARCH =====
  SEARCH: {
    GET_SEARCH: (query) => `/api/Search/GetSearch/${query}`,
    AUTOCOMPLETE: '/api/Search/Autocomplete',
    GET_ALL_ACTIVE: '/api/Search/GetAllActive'
  },

  // ===== USERS & BUYERS =====
  COMPRADORES: {
    GET_ALL: '/api/Compradores/GetCompradores',
    GET_BY_ID: (id) => `/api/Compradores/GetComprador/${id}`,
    UPDATE: '/api/Compradores/UpdateComprador',
    UPDATE_TIPO_PERSONA: '/api/Compradores/UpdateTipoPersona',
    UPDATE_FISICO: '/api/Compradores/UpdateCompradorFisica',
    UPDATE_MORAL: '/api/Compradores/UpdateCompradorMoral',
    UPDATE_FISCAL: '/api/Compradores/UpdateCompradorFiscal',
    GET_INFO_FISCAL: (id) => `/api/Compradores/GetInfoFiscal/${id}`,
    
    // Documentos
    GET_DOCUMENTOS: (id) => `/api/Compradores/GetCompradorDocumentos/${id}`,
    POST_DOCUMENTO: '/api/Compradores/PostDocumentoComprador',
    GET_DOCUMENTO: (id) => `/api/Compradores/GetCompradorDocumento/${id}`,
    DELETE_DOCUMENTO: (id) => `/api/Compradores/DeleteCompradorDocumento/${id}`,

    // Adjudicaciones
    GET_ADJUDICACIONES_ADMIN: (id) => `/api/Compradores/GetAdjudicacionesAdmin/${id}`,
    LIBERAR_ARTICULO: (articuloID, usuarioID) => `/api/Compradores/LiberarArticulo/${articuloID}/${usuarioID}`,
    
    // Pagos
    POST_PAGO_ARTICULO: '/api/Compradores/PostPagoArticulo',
    GET_PAGO_ARTICULO: (articuloID, tipo) => `/api/Compradores/GetPagoArticulo/${articuloID}/${tipo}`
  },

  // ===== USER INFO =====
  INFO_COMPRADOR: {
    GET_INFO: '/api/InfoComprador/GetInfoComprador',
    UPDATE_TIPO_PERSONA: '/api/InfoComprador/UpdateTipoPersona',
    UPDATE_FISICO: '/api/InfoComprador/UpdateCompradorFisica',
    UPDATE_MORAL: '/api/InfoComprador/UpdateCompradorMoral',
    
    // Documentos
    GET_DOCUMENTOS: '/api/InfoComprador/GetCompradorDocumentos',
    POST_DOCUMENTO: '/api/InfoComprador/PostDocumentoComprador',
    GET_DOCUMENTO: (id) => `/api/InfoComprador/GetCompradorDocumento/${id}`,
    DELETE_DOCUMENTO: (id) => `/api/InfoComprador/DeleteCompradorDocumento/${id}`,
    
    // Adjudicaciones y pagos
    GET_ADJUDICACIONES: '/api/InfoComprador/GetAdjudicaciones',
    POST_PAGO_ARTICULO: '/api/InfoComprador/PostPagoArticulo',
    GET_PAGO_ARTICULO: (articuloID, tipo) => `/api/InfoComprador/GetPagoArticulo/${articuloID}/${tipo}`
  },

  // ===== GUARANTEES =====
  GARANTIAS: {
    GET_ALL: '/api/CompradorGarantias/GetGarantias',
    POST: '/api/CompradorGarantias/PostGarantia',
    GET_FILE: (id) => `/api/CompradorGarantias/GetGarantiaFile/${id}`,
    
    // Admin
    ADMIN: {
      GET_BY_COMPRADOR: (compradorID) => `/api/CompradoresGarantias/GetGarantias/${compradorID}`,
      POST: '/api/CompradoresGarantias/PostGarantia',
      RESTA: '/api/CompradoresGarantias/RestaGarantia',
      GET_DOCUMENTO: (id) => `/api/CompradoresGarantias/GetDocumentoGarantia/${id}`,
      VALIDAR: '/api/CompradoresGarantias/ValidarGarantia',
      ENVIAR_BOLETA: (compradorID) => `/api/CompradoresGarantias/EnviaBoletaGarantia/${compradorID}`
    }
  },

  // ===== PAYMENT ORDERS =====
  ORDENES_PAGO: {
    GET_BY_COMPRADOR: '/api/CompradorOrdenesPago/GetOrdenesPagoByComprador',
    CREATE_ITEM: '/api/CompradorOrdenesPago/CreateOrdenPagoItemComprador',
    GET_DOCUMENTO: (id) => `/api/CompradorOrdenesPago/GetDocumentoPago/${id}`,
    
    // Admin
    ADMIN: {
      GET_BY_COMPRADOR: (compradorID) => `/api/AdminPagos/GetOrdenesPagoByComprador/${compradorID}`,
      CREATE_ORDEN: '/api/AdminPagos/CreateOrdenPago',
      CREATE_ITEM: '/api/AdminPagos/CreateOrdenPagoItem',
      VALIDAR_ITEM: '/api/AdminPagos/ValidarOrdenPagoItem',
      GET_DOCUMENTO: (id) => `/api/AdminPagos/GetDocumentoPago/${id}`
    }
  },

  // ===== TOKENS =====
  TOKENS: {
    COMPRAR: '/api/Tokens/comprar',
    GET_BALANCE: '/api/Tokens/GetMyBalance',
    GET_TRANSACCIONES: (username) => `/api/Tokens/transaccion/${username}`
  },

  // ===== LOCATIONS =====
  GENERICOS: {
    GET_ROLES: '/api/Genericos/GetRoles',
    GET_ESTADOS: '/api/Genericos/GetEstados',
    GET_MUNICIPIOS: (estadoID) => `/api/Genericos/GetMunicipios/${estadoID}`,
    GET_CATEGORIAS_SELECT: '/api/Genericos/GetCategoriasSelect',
    GET_CLIENTES_SELECT: '/api/Genericos/GetClientesSelect',
    GET_ESTATUS_ARTICULO_SELECT: '/api/Genericos/GetEstatusArticuloSelect',
    GET_CUENTAS_PAGO_SELECT: '/api/Genericos/GetCuentasPagoSelect'
  },

  // ===== VENDORS =====
  VENDEDOR: {
    POST_ALTA: '/api/Vendedor/PostAlta',
    GET_LISTA_AUTOS: '/api/Vendedor/GetListaAutos',
    POST_GUARDAR: '/api/Vendedor/PostGuardar',
    SUBIR_ARCHIVO: (articuloID) => `/api/Vendedor/SubirArchivo/${articuloID}`,
    DELETE_IMAGEN: (imagenID) => `/api/Vendedor/DeleteImagen/${imagenID}`,
    GET_LISTA_FOTOS: (articuloID) => `/api/Vendedor/GetListaFotos/${articuloID}`,
    
    // Admin
    ADMIN_GUARDAR: '/api/Vendedor/AdminGuardar',
    ADMIN_UPDATE: '/api/Vendedor/AdminUpdate'
  },

  // ===== COMMENTS =====
  COMENTARIOS: {
    POST: '/api/Comentarios'
  },

  // ===== ACTIONS =====
  ACTIONS: {
    GENERA_NUEVO_PASS: (email) => `/api/Actions/GeneraNuevoPass/${email}`,
    POST_PRE_COMPRADOR: '/api/Actions/PostPreComprador',
    GET_DESTACADOS: '/api/Actions/GetDestacados',
    GET_SIGUIENTE_SUBASTA: '/api/Actions/GetSiguienteSubasta',
    POST_FORMA_CONTACTO: '/api/Actions/PostFormaContacto'
  },

  // ===== IMAGES =====
  IMAGE_WEB: {
    SLIDESHOW: '/api/ImageWeb/SlideShow',
    CARS_GRID: '/api/ImageWeb/CarsGrid'
  },

  // ===== CLIENTS =====
  CLIENTES: {
    GET_ALL: '/api/Clientes/GetClientes',
    GET_BY_ID: (id) => `/api/Clientes/GetCliente/${id}`,
    POST: '/api/Clientes/PostCliente',
    UPDATE_TIPO_PERSONA: '/api/Clientes/UpdateTipoPersona',
    UPDATE_FISICO: '/api/Clientes/UpdateClienteFisico',
    UPDATE_MORAL: '/api/Clientes/UpdateClienteMoral',
    
    // Documentos
    GET_DOCUMENTOS: (id) => `/api/Clientes/GetClienteDocumentos/${id}`,
    POST_DOCUMENTO: '/api/Clientes/PostClienteDocumento',
    GET_DOCUMENTO: (id) => `/api/Clientes/GetClienteDocumento/${id}`,
    DELETE_DOCUMENTO: (id) => `/api/Clientes/DeleteClienteDocumento/${id}`,
    
    // Historial
    GET_HISTORIAL: (id) => `/api/Clientes/GetClienteHistorial/${id}`,
    POST_HISTORIAL: '/api/Clientes/PostClienteHistorial',
    
    TEST: '/api/Clientes/Test'
  },

  // ===== USERS =====
  USUARIOS: {
    GET_ALL: '/api/Usuarios/GetUsuarios',
    GET_BY_ID: (id) => `/api/Usuarios/GetUsuario/${id}`,
    POST: '/api/Usuarios/PostUsuario',
    GET_IN_ROLES: (id) => `/api/Usuarios/GetUsuarioInRoles/${id}`,
    ADD_ROLE: '/api/Usuarios/AddRole',
    REMOVE_ROLE: (id) => `/api/Usuarios/RemoveRole/${id}`,
    TEST: '/api/Usuarios/Test'
  },

  // ===== ADMIN TORRES =====
  ADMIN_TORRES: {
    GET_ALL: '/api/AdminTorres/GetTorres',
    UPDATE_FECHAS: '/api/AdminTorres/UpdateFechasTorre'
  },

  // ===== PRE COMPRADORES =====
  PRE_COMPRADORES: {
    POST: '/api/PreCompradores/PostPreComprador',
    GET_ALL: '/api/PreCompradores/GetPreCompradores',
    DELETE: (id) => `/api/PreCompradores/DelePreComprador/${id}`
  },

  // ===== TRADER =====
  TRADER: {
    SET_TIPO_PERSONA: '/api/Trader/SetTipoPersona'
  }
};

// Helper function para construir URLs con parámetros de query
export const buildUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, window.location.origin);
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.pathname + url.search;
};

// Helper para endpoints de búsqueda con parámetros
export const buildSearchUrl = (query, params = {}) => {
  const defaultParams = {
    page: 1,
    pageSize: 50,
    ...params
  };
  
  return buildUrl(API_ENDPOINTS.SEARCH.GET_SEARCH(query), defaultParams);
};

// Helper para endpoints de autocomplete
export const buildAutocompleteUrl = (term, limit = 10) => {
  return buildUrl(API_ENDPOINTS.SEARCH.AUTOCOMPLETE, { term, limit });
};

// Helper para endpoints paginados
export const buildPaginatedUrl = (endpoint, page = 1, pageSize = 50) => {
  return buildUrl(endpoint, { page, pageSize });
};