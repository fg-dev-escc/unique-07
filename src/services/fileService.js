import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { uploadFile, downloadFile, del } from './apiService';
import { TIPOS_DOCUMENTO } from '../types/api.types';

class FileService {

  // ===== IMAGE UPLOAD =====
  async uploadArticuloImage(articuloID, file, usuarioID, esPrincipal = false) {
    try {
      const additionalData = {
        usuarioId: usuarioID,
        esPortada: esPrincipal
      };

      const response = await uploadFile(
        API_ENDPOINTS.VENDEDOR.SUBIR_ARCHIVO(articuloID),
        file,
        additionalData
      );

      return response;
    } catch (error) {
      console.error('Upload articulo image error:', error);
      return {
        success: false,
        message: 'Error al subir imagen'
      };
    }
  }

  async uploadArticuloDocument(articuloID, file, nombre, usuarioID, tipo = TIPOS_DOCUMENTO.DOCUMENTO) {
    try {
      const additionalData = {
        ArticuloID: articuloID,
        Nombre: nombre,
        UsuarioID: usuarioID,
        Tipo: tipo
      };

      const response = await uploadFile(
        API_ENDPOINTS.ARTICULOS.POST_DOCUMENTO,
        file,
        additionalData
      );

      return response;
    } catch (error) {
      console.error('Upload articulo document error:', error);
      return {
        success: false,
        message: 'Error al subir documento'
      };
    }
  }

  // ===== BUYER DOCUMENTS =====
  async uploadCompradorDocument(file, nombre, compradorID = null, usuarioID = null) {
    try {
      let endpoint, additionalData;

      if (compradorID && usuarioID) {
        // Admin upload
        endpoint = API_ENDPOINTS.COMPRADORES.POST_DOCUMENTO;
        additionalData = {
          CompradorID: compradorID,
          Nombre: nombre,
          UsuarioID: usuarioID
        };
      } else {
        // Self upload
        endpoint = API_ENDPOINTS.INFO_COMPRADOR.POST_DOCUMENTO;
        additionalData = {
          Nombre: nombre
        };
      }

      const response = await uploadFile(endpoint, file, additionalData);
      return response;
    } catch (error) {
      console.error('Upload comprador document error:', error);
      return {
        success: false,
        message: 'Error al subir documento'
      };
    }
  }

  // ===== GUARANTEE DOCUMENTS =====
  async uploadGarantiaDocument(file, monto, compradorID = null) {
    try {
      let endpoint, additionalData;

      if (compradorID) {
        // Admin upload
        endpoint = API_ENDPOINTS.GARANTIAS.ADMIN.POST;
        additionalData = {
          CompradorID: compradorID,
          Monto: monto
        };
      } else {
        // Self upload
        endpoint = API_ENDPOINTS.GARANTIAS.POST;
        additionalData = {
          Monto: monto
        };
      }

      const response = await uploadFile(endpoint, file, additionalData);
      return response;
    } catch (error) {
      console.error('Upload garantia document error:', error);
      return {
        success: false,
        message: 'Error al subir documento de garantía'
      };
    }
  }

  // ===== PAYMENT DOCUMENTS =====
  async uploadPagoDocument(file, ordenPagoID, monto, usuarioCargaPagoID = null) {
    try {
      let endpoint, additionalData;

      if (usuarioCargaPagoID) {
        // Admin upload
        endpoint = API_ENDPOINTS.ORDENES_PAGO.ADMIN.CREATE_ITEM;
        additionalData = {
          OrdenPagoID: ordenPagoID,
          Monto: monto,
          UsuarioCargaPagoID: usuarioCargaPagoID
        };
      } else {
        // Self upload
        endpoint = API_ENDPOINTS.ORDENES_PAGO.CREATE_ITEM;
        additionalData = {
          OrdenPagoID: ordenPagoID,
          Monto: monto
        };
      }

      const response = await uploadFile(endpoint, file, additionalData);
      return response;
    } catch (error) {
      console.error('Upload pago document error:', error);
      return {
        success: false,
        message: 'Error al subir comprobante de pago'
      };
    }
  }

  async uploadPagoArticulo(file, articuloID, tipo) {
    try {
      const additionalData = {
        ArticuloID: articuloID,
        Tipo: tipo
      };

      const response = await uploadFile(
        API_ENDPOINTS.INFO_COMPRADOR.POST_PAGO_ARTICULO,
        file,
        additionalData
      );

      return response;
    } catch (error) {
      console.error('Upload pago articulo error:', error);
      return {
        success: false,
        message: 'Error al subir comprobante'
      };
    }
  }

  // ===== CLIENT DOCUMENTS =====
  async uploadClienteDocument(file, clienteID, nombre, usuarioID) {
    try {
      const additionalData = {
        ClienteID: clienteID,
        Nombre: nombre,
        UsuarioID: usuarioID
      };

      const response = await uploadFile(
        API_ENDPOINTS.CLIENTES.POST_DOCUMENTO,
        file,
        additionalData
      );

      return response;
    } catch (error) {
      console.error('Upload cliente document error:', error);
      return {
        success: false,
        message: 'Error al subir documento del cliente'
      };
    }
  }

  // ===== FILE DELETION =====
  async deleteArticuloImage(imagenID) {
    try {
      const response = await del(API_ENDPOINTS.VENDEDOR.DELETE_IMAGEN(imagenID));
      return response;
    } catch (error) {
      console.error('Delete articulo image error:', error);
      return {
        success: false,
        message: 'Error al eliminar imagen'
      };
    }
  }

  async deleteArticuloDocument(articuloDocumentoID) {
    try {
      const response = await del(API_ENDPOINTS.ARTICULOS.DELETE_DOCUMENTO(articuloDocumentoID));
      return response;
    } catch (error) {
      console.error('Delete articulo document error:', error);
      return {
        success: false,
        message: 'Error al eliminar documento'
      };
    }
  }

  async deleteCompradorDocument(compradorDocumentoID, isAdmin = false) {
    try {
      const endpoint = isAdmin 
        ? API_ENDPOINTS.COMPRADORES.DELETE_DOCUMENTO(compradorDocumentoID)
        : API_ENDPOINTS.INFO_COMPRADOR.DELETE_DOCUMENTO(compradorDocumentoID);
      
      const response = await del(endpoint);
      return response;
    } catch (error) {
      console.error('Delete comprador document error:', error);
      return {
        success: false,
        message: 'Error al eliminar documento'
      };
    }
  }

  async deleteClienteDocument(clienteDocumentoID) {
    try {
      const response = await del(API_ENDPOINTS.CLIENTES.DELETE_DOCUMENTO(clienteDocumentoID));
      return response;
    } catch (error) {
      console.error('Delete cliente document error:', error);
      return {
        success: false,
        message: 'Error al eliminar documento'
      };
    }
  }

  // ===== FILE DOWNLOAD =====
  async downloadArticuloDocument(articuloDocumentoID, filename) {
    try {
      const response = await downloadFile(
        API_ENDPOINTS.ARTICULOS.GET_DOCUMENTO(articuloDocumentoID),
        filename
      );
      return response;
    } catch (error) {
      console.error('Download articulo document error:', error);
      return {
        success: false,
        message: 'Error al descargar documento'
      };
    }
  }

  async downloadCompradorDocument(compradorDocumentoID, filename, isAdmin = false) {
    try {
      const endpoint = isAdmin 
        ? API_ENDPOINTS.COMPRADORES.GET_DOCUMENTO(compradorDocumentoID)
        : API_ENDPOINTS.INFO_COMPRADOR.GET_DOCUMENTO(compradorDocumentoID);
      
      const response = await downloadFile(endpoint, filename);
      return response;
    } catch (error) {
      console.error('Download comprador document error:', error);
      return {
        success: false,
        message: 'Error al descargar documento'
      };
    }
  }

  async downloadGarantiaDocument(compradorGarantiaID, filename, isAdmin = false) {
    try {
      const endpoint = isAdmin 
        ? API_ENDPOINTS.GARANTIAS.ADMIN.GET_DOCUMENTO(compradorGarantiaID)
        : API_ENDPOINTS.GARANTIAS.GET_FILE(compradorGarantiaID);
      
      const response = await downloadFile(endpoint, filename);
      return response;
    } catch (error) {
      console.error('Download garantia document error:', error);
      return {
        success: false,
        message: 'Error al descargar documento de garantía'
      };
    }
  }

  async downloadPagoDocument(ordenPagoItemID, filename, isAdmin = false) {
    try {
      const endpoint = isAdmin 
        ? API_ENDPOINTS.ORDENES_PAGO.ADMIN.GET_DOCUMENTO(ordenPagoItemID)
        : API_ENDPOINTS.ORDENES_PAGO.GET_DOCUMENTO(ordenPagoItemID);
      
      const response = await downloadFile(endpoint, filename);
      return response;
    } catch (error) {
      console.error('Download pago document error:', error);
      return {
        success: false,
        message: 'Error al descargar comprobante'
      };
    }
  }

  async downloadClienteDocument(clienteDocumentoID, filename) {
    try {
      const response = await downloadFile(
        API_ENDPOINTS.CLIENTES.GET_DOCUMENTO(clienteDocumentoID),
        filename
      );
      return response;
    } catch (error) {
      console.error('Download cliente document error:', error);
      return {
        success: false,
        message: 'Error al descargar documento'
      };
    }
  }

  // ===== FILE VALIDATION =====
  validateImageFile(file, maxSizeMB = 10) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes

    if (!file) {
      return { valid: false, message: 'No se ha seleccionado ningún archivo' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        message: 'Tipo de archivo no válido. Solo se permiten JPG, PNG y WebP' 
      };
    }

    if (file.size > maxSize) {
      return { 
        valid: false, 
        message: `El archivo es demasiado grande. Máximo ${maxSizeMB}MB` 
      };
    }

    return { valid: true };
  }

  validateDocumentFile(file, maxSizeMB = 25) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    const maxSize = maxSizeMB * 1024 * 1024;

    if (!file) {
      return { valid: false, message: 'No se ha seleccionado ningún archivo' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        message: 'Tipo de archivo no válido. Solo se permiten PDF, Word, Excel e imágenes' 
      };
    }

    if (file.size > maxSize) {
      return { 
        valid: false, 
        message: `El archivo es demasiado grande. Máximo ${maxSizeMB}MB` 
      };
    }

    return { valid: true };
  }

  // ===== FILE UTILITIES =====
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  getFileTypeIcon(filename) {
    const extension = this.getFileExtension(filename);
    
    const iconMap = {
      'pdf': 'fas fa-file-pdf text-danger',
      'doc': 'fas fa-file-word text-primary',
      'docx': 'fas fa-file-word text-primary',
      'xls': 'fas fa-file-excel text-success',
      'xlsx': 'fas fa-file-excel text-success',
      'jpg': 'fas fa-file-image text-info',
      'jpeg': 'fas fa-file-image text-info',
      'png': 'fas fa-file-image text-info',
      'webp': 'fas fa-file-image text-info'
    };

    return iconMap[extension] || 'fas fa-file text-muted';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // ===== BATCH OPERATIONS =====
  async uploadMultipleImages(articuloID, files, usuarioID, onProgress = null) {
    const results = [];
    const total = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const esPrincipal = i === 0; // First image is main

      if (onProgress) {
        onProgress({
          current: i + 1,
          total,
          fileName: file.name,
          percentage: Math.round(((i + 1) / total) * 100)
        });
      }

      try {
        const result = await this.uploadArticuloImage(articuloID, file, usuarioID, esPrincipal);
        results.push({
          file: file.name,
          success: result.success,
          data: result.data,
          message: result.message
        });
      } catch (error) {
        results.push({
          file: file.name,
          success: false,
          message: error.message
        });
      }
    }

    return {
      success: results.every(r => r.success),
      results,
      totalUploaded: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length
    };
  }

  // ===== IMAGE OPTIMIZATION =====
  async compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  async createThumbnail(file, size = 200) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        // Calculate crop area for square thumbnail
        const { width, height } = img;
        const cropSize = Math.min(width, height);
        const startX = (width - cropSize) / 2;
        const startY = (height - cropSize) / 2;

        ctx.drawImage(img, startX, startY, cropSize, cropSize, 0, 0, size, size);
        
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

export default new FileService();