import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { get, post, put, del } from './apiService';
import { 
  CategoriaDTO, 
  SubcategoriaDTO, 
  CampoInfoDTO,
  CampoValorItemDTO,
  TIPOS_CAMPO 
} from '../types/api.types';

class CategoryService {
  
  // ===== CATEGORIAS =====
  async getCategorias() {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_ALL);
      return response;
    } catch (error) {
      console.error('Get categorias error:', error);
      return { success: false, message: 'Error al obtener categorías' };
    }
  }

  async getCategoriasSelect() {
    try {
      const response = await get(API_ENDPOINTS.GENERICOS.GET_CATEGORIAS_SELECT);
      return response;
    } catch (error) {
      console.error('Get categorias select error:', error);
      return { success: false, message: 'Error al obtener categorías' };
    }
  }

  async createCategoria(nombre) {
    try {
      const data = {
        ...CategoriaDTO,
        nombre
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.POST, data);
      return response;
    } catch (error) {
      console.error('Create categoria error:', error);
      return { success: false, message: 'Error al crear categoría' };
    }
  }

  async updateCategoria(categoriaID, nombre) {
    try {
      const data = {
        ...CategoriaDTO,
        categoriaID,
        nombre
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.UPDATE, data);
      return response;
    } catch (error) {
      console.error('Update categoria error:', error);
      return { success: false, message: 'Error al actualizar categoría' };
    }
  }

  async deleteCategoria(categoriaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.DELETE(categoriaID));
      return response;
    } catch (error) {
      console.error('Delete categoria error:', error);
      return { success: false, message: 'Error al eliminar categoría' };
    }
  }

  // ===== SUBCATEGORIAS =====
  async getSubcategorias(categoriaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_SUBCATEGORIAS(categoriaID));
      return response;
    } catch (error) {
      console.error('Get subcategorias error:', error);
      return { success: false, message: 'Error al obtener subcategorías' };
    }
  }

  async createSubcategoria(categoriaID, nombre) {
    try {
      const data = {
        ...SubcategoriaDTO,
        categoriaID,
        nombre
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.POST_SUBCATEGORIA, data);
      return response;
    } catch (error) {
      console.error('Create subcategoria error:', error);
      return { success: false, message: 'Error al crear subcategoría' };
    }
  }

  async updateSubcategoria(subcategoriaID, categoriaID, nombre) {
    try {
      const data = {
        ...SubcategoriaDTO,
        subcategoriaID,
        categoriaID,
        nombre
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.UPDATE_SUBCATEGORIA, data);
      return response;
    } catch (error) {
      console.error('Update subcategoria error:', error);
      return { success: false, message: 'Error al actualizar subcategoría' };
    }
  }

  async deleteSubcategoria(subcategoriaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.DELETE_SUBCATEGORIA(subcategoriaID));
      return response;
    } catch (error) {
      console.error('Delete subcategoria error:', error);
      return { success: false, message: 'Error al eliminar subcategoría' };
    }
  }

  // ===== CAMPOS DINAMICOS =====
  async getCamposBySubcategoria(subcategoriaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_CAMPOS(subcategoriaID));
      return response;
    } catch (error) {
      console.error('Get campos error:', error);
      return { success: false, message: 'Error al obtener campos' };
    }
  }

  async getCamposByArticulo(articuloID) {
    try {
      const response = await get(API_ENDPOINTS.ARTICULOS.GET_CAMPOS(articuloID));
      return response;
    } catch (error) {
      console.error('Get campos articulo error:', error);
      return { success: false, message: 'Error al obtener campos del artículo' };
    }
  }

  async getCamposValor(articuloID) {
    try {
      const response = await get(API_ENDPOINTS.ARTICULOS.GET_CAMPOS_VALOR(articuloID));
      return response;
    } catch (error) {
      console.error('Get campos valor error:', error);
      return { success: false, message: 'Error al obtener valores de campos' };
    }
  }

  async createCampo(subcategoriaID, label, tipo, listaID = null, orden = null) {
    try {
      const data = {
        ...CampoInfoDTO,
        subcategoriaID,
        label,
        tipo,
        listaID,
        orden
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.POST_CAMPO, data);
      return response;
    } catch (error) {
      console.error('Create campo error:', error);
      return { success: false, message: 'Error al crear campo' };
    }
  }

  async updateCampo(campoID, subcategoriaID, label, tipo, listaID = null, orden = null) {
    try {
      const data = {
        ...CampoInfoDTO,
        campoID,
        subcategoriaID,
        label,
        tipo,
        listaID,
        orden
      };
      const response = await post(API_ENDPOINTS.CATEGORIAS.UPDATE_CAMPO, data);
      return response;
    } catch (error) {
      console.error('Update campo error:', error);
      return { success: false, message: 'Error al actualizar campo' };
    }
  }

  async deleteCampo(campoID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.DELETE_CAMPO(campoID));
      return response;
    } catch (error) {
      console.error('Delete campo error:', error);
      return { success: false, message: 'Error al eliminar campo' };
    }
  }

  // ===== VALORES DE CAMPOS =====
  async saveCamposValor(articuloID, camposValor) {
    try {
      const data = {
        articuloID,
        arrCampoValor: camposValor.map(cv => ({
          ...CampoValorItemDTO,
          campoID: cv.campoID,
          valor: cv.valor
        }))
      };
      const response = await post(API_ENDPOINTS.ARTICULOS.POST_CAMPOS_VALOR, data);
      return response;
    } catch (error) {
      console.error('Save campos valor error:', error);
      return { success: false, message: 'Error al guardar valores de campos' };
    }
  }

  // ===== LISTAS =====
  async getListas() {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_LISTAS);
      return response;
    } catch (error) {
      console.error('Get listas error:', error);
      return { success: false, message: 'Error al obtener listas' };
    }
  }

  async createLista(nombre) {
    try {
      const data = { nombre };
      const response = await post(API_ENDPOINTS.CATEGORIAS.POST_LISTA, data);
      return response;
    } catch (error) {
      console.error('Create lista error:', error);
      return { success: false, message: 'Error al crear lista' };
    }
  }

  async deleteLista(listaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.DELETE_LISTA(listaID));
      return response;
    } catch (error) {
      console.error('Delete lista error:', error);
      return { success: false, message: 'Error al eliminar lista' };
    }
  }

  // ===== ITEMS DE LISTA =====
  async getListaItems(listaID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_LISTA_ITEMS(listaID));
      return response;
    } catch (error) {
      console.error('Get lista items error:', error);
      return { success: false, message: 'Error al obtener items de lista' };
    }
  }

  async createListaItem(listaID, nombre) {
    try {
      const data = { listaID, nombre };
      const response = await post(API_ENDPOINTS.CATEGORIAS.POST_LISTA_ITEM, data);
      return response;
    } catch (error) {
      console.error('Create lista item error:', error);
      return { success: false, message: 'Error al crear item de lista' };
    }
  }

  async deleteListaItem(listaItemID) {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.DELETE_LISTA_ITEM(listaItemID));
      return response;
    } catch (error) {
      console.error('Delete lista item error:', error);
      return { success: false, message: 'Error al eliminar item de lista' };
    }
  }

  // ===== HELPERS =====
  
  // Validar tipo de campo
  isValidFieldType(tipo) {
    return Object.values(TIPOS_CAMPO).includes(tipo);
  }

  // Obtener configuración de campo por tipo
  getFieldConfig(tipo) {
    const configs = {
      [TIPOS_CAMPO.TEXT]: {
        component: 'input',
        type: 'text',
        validation: 'string'
      },
      [TIPOS_CAMPO.NUMBER]: {
        component: 'input',
        type: 'number',
        validation: 'number'
      },
      [TIPOS_CAMPO.SELECT]: {
        component: 'select',
        validation: 'string',
        requiresList: true
      },
      [TIPOS_CAMPO.MULTISELECT]: {
        component: 'multiselect',
        validation: 'array',
        requiresList: true
      },
      [TIPOS_CAMPO.DATE]: {
        component: 'input',
        type: 'date',
        validation: 'date'
      },
      [TIPOS_CAMPO.TEXTAREA]: {
        component: 'textarea',
        validation: 'string'
      },
      [TIPOS_CAMPO.CHECKBOX]: {
        component: 'checkbox',
        validation: 'boolean'
      }
    };

    return configs[tipo] || configs[TIPOS_CAMPO.TEXT];
  }

  // Validar valor según tipo de campo
  validateFieldValue(valor, tipo) {
    const config = this.getFieldConfig(tipo);
    
    switch (config.validation) {
      case 'number':
        return !isNaN(Number(valor));
      case 'boolean':
        return typeof valor === 'boolean' || valor === 'true' || valor === 'false';
      case 'date':
        return !isNaN(Date.parse(valor));
      case 'array':
        return Array.isArray(valor) || typeof valor === 'string';
      case 'string':
      default:
        return typeof valor === 'string' || valor !== null;
    }
  }

  // Formatear valor para envío
  formatFieldValue(valor, tipo) {
    const config = this.getFieldConfig(tipo);
    
    switch (config.validation) {
      case 'number':
        return Number(valor);
      case 'boolean':
        return Boolean(valor);
      case 'array':
        return Array.isArray(valor) ? valor.join(',') : valor;
      case 'string':
      case 'date':
      default:
        return String(valor);
    }
  }

  // Parsear valor recibido
  parseFieldValue(valor, tipo) {
    const config = this.getFieldConfig(tipo);
    
    switch (config.validation) {
      case 'number':
        return Number(valor) || 0;
      case 'boolean':
        return Boolean(valor) || valor === 'true';
      case 'array':
        return typeof valor === 'string' ? valor.split(',') : [];
      case 'date':
        return valor ? new Date(valor).toISOString().split('T')[0] : '';
      case 'string':
      default:
        return String(valor || '');
    }
  }

  // Construir esquema de validación para formulario
  buildValidationSchema(campos) {
    const schema = {};
    
    campos.forEach(campo => {
      const config = this.getFieldConfig(campo.tipo);
      schema[`campo_${campo.campoID}`] = {
        label: campo.label,
        type: config.validation,
        required: campo.requerido || false,
        component: config.component,
        options: campo.listaItems || []
      };
    });

    return schema;
  }

  // Construir valores iniciales para formulario
  buildInitialValues(campos, valoresActuales = []) {
    const values = {};
    
    campos.forEach(campo => {
      const valorActual = valoresActuales.find(v => v.campoID === campo.campoID);
      const valor = valorActual ? valorActual.valor : '';
      values[`campo_${campo.campoID}`] = this.parseFieldValue(valor, campo.tipo);
    });

    return values;
  }

  // Procesar valores de formulario para envío
  processFormValues(formValues, campos) {
    const camposValor = [];
    
    Object.keys(formValues).forEach(key => {
      if (key.startsWith('campo_')) {
        const campoID = parseInt(key.replace('campo_', ''));
        const campo = campos.find(c => c.campoID === campoID);
        
        if (campo) {
          const valor = this.formatFieldValue(formValues[key], campo.tipo);
          camposValor.push({
            campoID,
            valor
          });
        }
      }
    });

    return camposValor;
  }
}

export default new CategoryService();