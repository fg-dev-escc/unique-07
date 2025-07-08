// API Types y DTOs basados en OpenAPI Subasta30

// ===== AUTHENTICATION TYPES =====
export const LoginDTO = {
  email: '',
  password: '',
  app: 'web'
};

export const CreateCompradorDTO = {
  code: '',
  password: ''
};

export const RefreshDTO = {
  token: '',
  app: 'web'
};

// ===== ARTICLE TYPES =====
export const ArticuloDetalleDTO = {
  articuloID: '',
  nombre: '',
  descripcion: '',
  montoSalida: 0,
  estatusArticuloID: 0,
  clienteID: '',
  subcategoriaID: 0,
  municipioID: 0,
  cp: '',
  calle: '',
  colonia: '',
  noExt: '',
  noInt: '',
  otrosDatos: '',
  observaciones: '',
  fechaCaptura: '',
  urlImgPrincipal: '',
  esDestacado: false,
  contactoNombre: '',
  contactoTelefono: '',
  contactoEmail: '',
  diasAnticipo: null,
  diasLiquidacion: null,
  documentos: [],
  valores: []
};

export const ArticuloListaDTO = {
  articuloID: '',
  nombre: '',
  descripcion: '',
  urlImgPrincipal: '',
  fechaCaptura: '',
  montoSalida: 0,
  estatusArticuloID: 0
};

export const PostArticuloDTO = {
  articuloID: '',
  clienteID: '',
  subcategoriaID: 0,
  nombre: '',
  descripcion: '',
  montoSalida: 0,
  cp: '',
  municipioID: 0,
  usuarioID: '',
  calle: '',
  no: '',
  otrosDatos: '',
  noExt: '',
  noInt: '',
  colonia: '',
  observaciones: '',
  tipoVenta: '',
  claveCliente: '',
  contactoNombre: '',
  contactoTelefono: '',
  contactoEmail: '',
  diasAnticipo: null,
  diasLiquidacion: null
};

// ===== VEHICLE TYPES =====
export const AutoDTO = {
  id: 0,
  vendedorId: 0,
  marca: '',
  modelo: '',
  submarca: '',
  combustible: '',
  potencia: 0,
  transmision: '',
  kilometraje: 0,
  color: ''
};

// ===== AUCTION TYPES =====
export const SubastaDTO = {
  subastaID: '',
  nombre: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  estatusSubasta: '',
  torres: []
};

export const TorreDTO = {
  torreID: '',
  numeroTorre: 0,
  subastaID: '',
  articuloID: '',
  fechaInicio: '',
  fechaFin: '',
  montoActual: 0,
  compradorGanador: '',
  estatusTorre: ''
};

// ===== BIDDING TYPES =====
export const PostPujaDTO = {
  torreID: '',
  monto: 0
};

export const PujaDTO = {
  pujaID: '',
  torreID: '',
  compradorID: '',
  monto: 0,
  fechaPuja: '',
  esGanadora: false
};

// ===== DOCUMENT TYPES =====
export const ArticuloDocumentoDTO = {
  articuloDocumentoID: '',
  articuloID: '',
  nombre: '',
  url: '',
  urlCompleta: '',
  tipo: '',
  ext: '',
  fechaCarga: '',
  usuarioCargaID: '',
  marcadoEliminar: false,
  esPrincipal: false
};

export const FotoInfoDTO = {
  articuloDocumentoID: '',
  nombre: '',
  url: '',
  tipo: '',
  esPrincipal: false
};

// ===== CATEGORY TYPES =====
export const CategoriaDTO = {
  categoriaID: 0,
  nombre: ''
};

export const SubcategoriaDTO = {
  subcategoriaID: 0,
  categoriaID: 0,
  nombre: ''
};

export const CampoInfoDTO = {
  campoID: 0,
  subcategoriaID: 0,
  label: '',
  tipo: '',
  listaID: null,
  orden: null
};

export const CampoValorDetalleDTO = {
  campoValorID: 0,
  articuloID: '',
  campoID: 0,
  valor: '',
  campo: null
};

export const CampoValorItemDTO = {
  campoID: 0,
  valor: ''
};

// ===== USER TYPES =====
export const CompradorDTO = {
  compradorID: '',
  email: '',
  tipoPersona: 0, // 1: Física, 2: Moral
  puedeOfertar: false,
  documentacionCompleta: false,
  datosCompletos: false,
  minimoGarantia: 0
};

export const UpdateCompradorFisicoDTO = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  rfc: '',
  telefono: '',
  email: '',
  curp: '',
  ocupacion: '',
  calle: '',
  noExt: '',
  noInt: '',
  colonia: '',
  cp: '',
  municipioID: 0,
  nacionalidad: '',
  clabeBancaria: '',
  regimenFiscal: '',
  compradorID: ''
};

export const UpdateCompradorMoralDTO = {
  razonSocial: '',
  giroMercantil: '',
  nacionalidad: '',
  rfc: '',
  telefono: '',
  email: '',
  fechaConstitucion: '',
  folioMercantil: '',
  calle: '',
  noExt: '',
  noInt: '',
  colonia: '',
  cp: '',
  municipioID: 0,
  clabeBancaria: '',
  regimenFiscal: '',
  apoderadoNombre: '',
  apoderadoApellidoPaterno: '',
  apoderadoApellidoMaterno: '',
  compradorID: ''
};

// ===== PAYMENT TYPES =====
export const OrdenPagoDTO = {
  compradorID: '',
  descripcion: '',
  monto: 0,
  fechaLimitePago: '',
  cuentaPagoID: 0,
  usuarioCreacionID: ''
};

export const GarantiaDTO = {
  compradorGarantiaID: 0,
  compradorID: '',
  monto: 0,
  fechaCarga: '',
  pagoValidado: false,
  motivoRechazo: ''
};

// ===== LOCATION TYPES =====
export const EstadoDTO = {
  estadoID: 0,
  nombre: ''
};

export const MunicipioDTO = {
  municipioID: 0,
  estadoID: 0,
  nombre: ''
};

// ===== SEARCH TYPES =====
export const SearchParamsDTO = {
  query: '',
  page: 1,
  pageSize: 50,
  categoria: null,
  subcategoria: null,
  precioMin: null,
  precioMax: null,
  ubicacion: null,
  sortBy: 'fecha'
};

// ===== PAGINATION TYPES =====
export const PaginationMetadataDTO = {
  paginaActual: 1,
  tamanoPagina: 50,
  totalRegistros: 0,
  totalPaginas: 0,
  tienePaginaAnterior: false,
  tienePaginaSiguiente: false,
  paginaAnterior: null,
  paginaSiguiente: null,
  registroInicial: 0,
  registroFinal: 0
};

// ===== FORM TYPES =====
export const FormaContactoDTO = {
  nombre: '',
  telefono: '',
  email: '',
  mensaje: ''
};

export const PreCompradorDTO = {
  email: '',
  comoSeEntero: ''
};

// ===== COMMENT TYPES =====
export const PostComentarioDTO = {
  torreID: '',
  comentario: ''
};

// ===== VENDOR TYPES =====
export const VendedorAltaDTO = {
  nombreCompleto: '',
  email: '',
  telefono: ''
};

export const VendedorGuardarDTO = {
  usuarioID: '',
  clienteID: '',
  auto: null
};

export const VendedorGuardarResultadoDTO = {
  success: false,
  message: '',
  articuloID: '',
  torreID: '',
  numeroTorre: null,
  totalFotosEnviadas: 0,
  totalFotosSubidas: 0,
  fotosSubidas: [],
  erroresValidacion: [],
  datosArticulo: null
};

// ===== API RESPONSE TYPES =====
export const ApiResponse = {
  success: false,
  message: '',
  data: null,
  errors: []
};

export const PaginatedResponse = {
  datos: [],
  paginacion: null
};

// ===== CONSTANTS =====
export const TIPO_PERSONA = {
  FISICA: 1,
  MORAL: 2
};

export const ESTATUS_ARTICULO = {
  BORRADOR: 1,
  PUBLICADO: 2,
  EN_SUBASTA: 3,
  VENDIDO: 4,
  CANCELADO: 5
};

export const ESTATUS_SUBASTA = {
  PROGRAMADA: 'PROGRAMADA',
  ACTIVA: 'ACTIVA',
  FINALIZADA: 'FINALIZADA',
  CANCELADA: 'CANCELADA'
};

export const ESTATUS_TORRE = {
  PROGRAMADA: 'PROGRAMADA',
  ACTIVA: 'ACTIVA',
  FINALIZADA: 'FINALIZADA',
  ADJUDICADA: 'ADJUDICADA',
  NO_ADJUDICADA: 'NO_ADJUDICADA'
};

export const TIPOS_DOCUMENTO = {
  IMAGEN: 'IMAGEN',
  DOCUMENTO: 'DOCUMENTO',
  VIDEO: 'VIDEO'
};

export const TIPOS_CAMPO = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  DATE: 'date',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox'
};

export const COMBUSTIBLES = [
  'Gasolina',
  'Diésel',
  'Híbrido',
  'Eléctrico',
  'Gas LP',
  'Gas Natural'
];

export const TRANSMISIONES = [
  'Manual',
  'Automática',
  'CVT',
  'Semiautomática'
];

export const COLORES = [
  'Blanco',
  'Negro',
  'Gris',
  'Plata',
  'Azul',
  'Rojo',
  'Verde',
  'Amarillo',
  'Naranja',
  'Morado',
  'Rosa',
  'Café',
  'Dorado',
  'Beige'
];