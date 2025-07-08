# Campos de la API - Subasta30 Backend

## Estructura Principal de Datos

### **Artículos (Productos para Subasta)**
```typescript
interface ArticuloDTO {
  articuloID: string
  nombre: string                  // max 200 chars
  descripcion: string            // max 1000 chars
  montoSalida: number            // mínimo 0.01
  subcategoriaID: number
  municipioID: number
  cp: string                     // código postal, max 10 chars
  calle?: string                 // max 200 chars
  colonia?: string               // max 100 chars
  noExt?: string                 // número exterior, max 20 chars
  noInt?: string                 // número interior, max 20 chars
  otrosDatos?: string            // max 500 chars
  observaciones?: string         // max 1000 chars
  tipoVenta?: string             // max 100 chars
  contactoNombre?: string        // max 100 chars
  contactoTelefono?: string      // max 20 chars
  contactoEmail?: string         // email, max 100 chars
  diasAnticipo?: number          // 0-365 días
  diasLiquidacion?: number       // 0-365 días
  camposValor: CampoValorItem[]  // campos dinámicos por categoría
}
```

### **Usuarios y Autenticación**
```typescript
interface LoginDTO {
  email: string
  password: string
  app: string                    // identificador de aplicación
}

interface UserPostDTO {
  usuarioID?: string
  nombre: string
  email: string
  password: string
  estaActivo: boolean
  apps: string[]                 // aplicaciones permitidas
}
```

### **Compradores**
```typescript
interface CompradorFisicoDTO {
  compradorID?: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  rfc: string
  telefono: string
  email: string
  curp: string
  ocupacion: string
  calle: string
  noExt: string
  noInt?: string
  colonia: string
  cp: string
  municipioID: number
  nacionalidad: string
  clabeBancaria: string
  regimenFiscal: string
}

interface CompradorMoralDTO {
  compradorID?: string
  razonSocial: string
  giroMercantil: string
  nacionalidad: string
  rfc: string
  telefono: string
  email: string
  fechaConstitucion: string
  folioMercantil: string
  calle: string
  noExt: string
  noInt?: string
  colonia: string
  cp: string
  municipioID: number
  clabeBancaria: string
  regimenFiscal: string
  apoderadoNombre: string
  apoderadoApellidoPaterno: string
  apoderadoApellidoMaterno: string
}
```

### **Subastas**
```typescript
interface SubastaDTO {
  subastaID?: string
  rangoFecha: string[]           // [fechaInicio, fechaFin]
  descripcion: string
  nombre: string
  usuarioCreateSubastaID: string
}

interface TorreDTO {
  torreID: string
  numeroTorre: number
  fechaInicio: string
  fechaFin: string
  articuloID: string
}
```

### **Pujas**
```typescript
interface PujaDTO {
  torreID: string
  monto: number                  // monto de la puja
}

interface AdjudicarDTO {
  torreID: string
  usuarioEstableceAdjudicacionID: string
  usuarioAdjudicadoID: string
  pujaID: string
}
```

### **Categorías y Campos Dinámicos**
```typescript
interface CategoriaDTO {
  categoriaID?: number
  nombre: string
}

interface SubcategoriaDTO {
  subcategoriaID?: number
  categoriaID: number
  nombre: string
}

interface CampoDTO {
  campoID?: number
  subcategoriaID: number
  label: string
  tipo: string                   // text, number, select, etc.
  listaID?: number              // para campos tipo select
  orden?: number
}

interface CampoValorItem {
  campoID: number
  valor: string                  // max 500 chars
}
```

### **Pagos y Garantías**
```typescript
interface OrdenPagoDTO {
  compradorID: string
  descripcion: string
  monto: number
  fechaLimitePago: string        // formato date-time
  cuentaPagoID: number
  usuarioCreacionID: string
}

interface GarantiaDTO {
  compradorID: string
  monto: number
  // File se maneja como multipart/form-data
}
```

### **Clientes (Vendedores)**
```typescript
interface ClienteDTO {
  clienteID?: string
  nombreComercial: string
  razonSocial: string
  contactoNombre: string
  contactoCelular: string
  contactoEmail: string
  usuarioID: string
  modeloSubasta: string
}
```

### **Documentos y Archivos**
```typescript
interface DocumentoDTO {
  // Para artículos
  ArticuloID: string
  Nombre: string
  UsuarioID: string
  Tipo: string                   // "imagen", "documento", etc.
  File: File                     // binary file upload
}

interface CompradorDocumentoDTO {
  CompradorID: string
  Nombre: string
  UsuarioID: string
  File: File
}
```

## Endpoints Clave por Funcionalidad

### **Autenticación**
- `POST /api/Login` - Login principal
- `POST /api/Login/Refresh` - Renovar token
- `POST /api/Login/CreateComprador` - Registro de comprador

### **Artículos (CRUD completo)**
- `GET /api/Articulos/GetArticulos` - Listar artículos
- `GET /api/Articulos/GetArticulo/{ArticuloID}` - Detalle de artículo
- `POST /api/Articulos/PostArticulo` - Crear artículo
- `POST /api/Articulos/UpdateArticulo` - Actualizar artículo
- `POST /api/Articulos/CambiaEstatusArticulo` - Cambiar estatus

### **Subastas**
- `GET /api/Subastas/GetSubastas` - Listar subastas
- `POST /api/Subastas/PostSubasta` - Crear subasta
- `POST /api/Subastas/PostArticulosSubasta` - Agregar artículos a subasta
- `GET /api/Subastas/GetTorres/{SubastaID}` - Torres de una subasta

### **Pujas**
- `POST /api/Pujas/Pujar` - Realizar puja
- `GET /api/Pujas/GetPujasUsuario/{UsuarioPujaID}/{TorreID}` - Pujas de usuario
- `POST /api/AdminPujas/AdjudicarTorre` - Adjudicar torre

### **Compradores**
- `GET /api/Compradores/GetCompradores` - Listar compradores
- `POST /api/Compradores/UpdateComprador` - Actualizar comprador
- `POST /api/Compradores/UpdateTipoPersona` - Física/Moral

### **Categorías**
- `GET /api/Categorias/GetCategorias` - Listar categorías
- `GET /api/Categorias/GetSubcategorias/{CategoriaID}` - Subcategorías
- `GET /api/Categorias/GetCampos/{SubcategoriaID}` - Campos por subcategoría

### **Archivos/Documentos**
- `POST /api/Articulos/PostDocumentoArticulo` - Subir documento de artículo
- `GET /api/Articulos/GetArticuloDocumento/{ArticuloDocumentoID}` - Descargar documento
- `POST /api/Compradores/PostDocumentoComprador` - Subir documento de comprador

### **Datos Genéricos**
- `GET /api/Genericos/GetEstados` - Estados/provincias
- `GET /api/Genericos/GetMunicipios/{EstadoID}` - Municipios por estado
- `GET /api/Genericos/GetRoles` - Roles de usuario

## Autenticación

La API usa **Bearer Token** authentication:
```
Authorization: Bearer {token}
```

Muchos endpoints requieren autenticación (marked with `"security": [{"oauth2": []}]`).

## Manejo de Archivos

Para upload de archivos, usar `multipart/form-data`:
```typescript
FormData {
  File: binary,
  [otherFields]: string
}
```

## Para Claude Code

**Campos más importantes para implementar:**

1. **Sistema de artículos**: nombre, descripción, montoSalida, subcategoriaID, municipioID, camposValor
2. **Sistema de usuarios**: email, password, roles
3. **Sistema de pujas**: torreID, monto
4. **Sistema de compradores**: datos fiscales completos
5. **Categorías dinámicas**: campos configurables por subcategoría

**Validaciones clave:**
- Montos mínimos (0.01)
- Longitudes máximas de strings
- Formatos de email
- Rangos de días (0-365)
- Tipos de persona (física/moral)