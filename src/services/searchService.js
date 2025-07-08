import { API_ENDPOINTS, buildSearchUrl, buildAutocompleteUrl, buildPaginatedUrl } from '../constants/apiEndpoints';
import { get } from './apiService';
import { SearchParamsDTO } from '../types/api.types';

class SearchService {

  // ===== MAIN SEARCH =====
  async search(query, filters = {}) {
    try {
      const searchParams = {
        ...SearchParamsDTO,
        query,
        ...filters
      };

      // Remove null/undefined values
      const cleanParams = Object.keys(searchParams).reduce((acc, key) => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
          acc[key] = searchParams[key];
        }
        return acc;
      }, {});

      const url = buildSearchUrl(query, cleanParams);
      const response = await get(url);

      return response;
    } catch (error) {
      console.error('Search error:', error);
      return {
        success: false,
        message: 'Error en la búsqueda'
      };
    }
  }

  // ===== AUTOCOMPLETE =====
  async autocomplete(term, limit = 10) {
    try {
      if (!term || term.length < 2) {
        return {
          success: true,
          data: []
        };
      }

      const url = buildAutocompleteUrl(term, limit);
      const response = await get(url);

      return response;
    } catch (error) {
      console.error('Autocomplete error:', error);
      return {
        success: false,
        message: 'Error en autocompletado'
      };
    }
  }

  // ===== GET ALL ACTIVE =====
  async getAllActive(page = 1, pageSize = 50, sortBy = 'fecha') {
    try {
      const params = { page, pageSize, sortBy };
      const url = buildPaginatedUrl(API_ENDPOINTS.SEARCH.GET_ALL_ACTIVE, page, pageSize);
      
      const response = await get(url);
      return response;
    } catch (error) {
      console.error('Get all active error:', error);
      return {
        success: false,
        message: 'Error al obtener artículos activos'
      };
    }
  }

  // ===== ADVANCED SEARCH =====
  async advancedSearch(filters) {
    try {
      const {
        query = '',
        categoria = null,
        subcategoria = null,
        precioMin = null,
        precioMax = null,
        ubicacion = null,
        estado = null,
        municipio = null,
        marca = null,
        modelo = null,
        anoMin = null,
        anoMax = null,
        combustible = null,
        transmision = null,
        kilometrajeMax = null,
        sortBy = 'fecha',
        page = 1,
        pageSize = 50
      } = filters;

      const searchParams = {
        query,
        page,
        pageSize,
        sortBy
      };

      // Add filters if they have values
      if (categoria) searchParams.categoria = categoria;
      if (subcategoria) searchParams.subcategoria = subcategoria;
      if (precioMin) searchParams.precioMin = precioMin;
      if (precioMax) searchParams.precioMax = precioMax;
      if (ubicacion) searchParams.ubicacion = ubicacion;
      if (estado) searchParams.estado = estado;
      if (municipio) searchParams.municipio = municipio;
      if (marca) searchParams.marca = marca;
      if (modelo) searchParams.modelo = modelo;
      if (anoMin) searchParams.anoMin = anoMin;
      if (anoMax) searchParams.anoMax = anoMax;
      if (combustible) searchParams.combustible = combustible;
      if (transmision) searchParams.transmision = transmision;
      if (kilometrajeMax) searchParams.kilometrajeMax = kilometrajeMax;

      const url = buildSearchUrl(query, searchParams);
      const response = await get(url);

      return response;
    } catch (error) {
      console.error('Advanced search error:', error);
      return {
        success: false,
        message: 'Error en búsqueda avanzada'
      };
    }
  }

  // ===== FILTER HELPERS =====
  
  // Build URL with filters
  buildFilterUrl(baseFilters, newFilters) {
    return {
      ...baseFilters,
      ...newFilters,
      page: 1 // Reset page when filters change
    };
  }

  // Clear specific filter
  clearFilter(filters, filterKey) {
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    newFilters.page = 1;
    return newFilters;
  }

  // Clear all filters
  clearAllFilters() {
    return {
      query: '',
      sortBy: 'fecha',
      page: 1,
      pageSize: 50
    };
  }

  // Get active filters count
  getActiveFiltersCount(filters) {
    const excludeKeys = ['query', 'sortBy', 'page', 'pageSize'];
    return Object.keys(filters).filter(key => 
      !excludeKeys.includes(key) && 
      filters[key] !== null && 
      filters[key] !== undefined && 
      filters[key] !== ''
    ).length;
  }

  // Format filters for display
  formatFiltersForDisplay(filters) {
    const formatted = [];
    
    if (filters.categoria) {
      formatted.push({ key: 'categoria', label: 'Categoría', value: filters.categoria });
    }
    if (filters.subcategoria) {
      formatted.push({ key: 'subcategoria', label: 'Subcategoría', value: filters.subcategoria });
    }
    if (filters.precioMin || filters.precioMax) {
      const priceRange = `${filters.precioMin ? `$${filters.precioMin}` : 'Min'} - ${filters.precioMax ? `$${filters.precioMax}` : 'Max'}`;
      formatted.push({ key: 'precio', label: 'Precio', value: priceRange });
    }
    if (filters.ubicacion) {
      formatted.push({ key: 'ubicacion', label: 'Ubicación', value: filters.ubicacion });
    }
    if (filters.marca) {
      formatted.push({ key: 'marca', label: 'Marca', value: filters.marca });
    }
    if (filters.modelo) {
      formatted.push({ key: 'modelo', label: 'Modelo', value: filters.modelo });
    }
    if (filters.anoMin || filters.anoMax) {
      const yearRange = `${filters.anoMin || 'Min'} - ${filters.anoMax || 'Max'}`;
      formatted.push({ key: 'ano', label: 'Año', value: yearRange });
    }
    if (filters.combustible) {
      formatted.push({ key: 'combustible', label: 'Combustible', value: filters.combustible });
    }
    if (filters.transmision) {
      formatted.push({ key: 'transmision', label: 'Transmisión', value: filters.transmision });
    }
    if (filters.kilometrajeMax) {
      formatted.push({ key: 'kilometrajeMax', label: 'Kilometraje máx.', value: `${filters.kilometrajeMax} km` });
    }

    return formatted;
  }

  // ===== SORT OPTIONS =====
  getSortOptions() {
    return [
      { value: 'fecha', label: 'Más recientes', icon: 'fas fa-clock' },
      { value: 'precio_asc', label: 'Menor precio', icon: 'fas fa-arrow-up' },
      { value: 'precio_desc', label: 'Mayor precio', icon: 'fas fa-arrow-down' },
      { value: 'nombre', label: 'Nombre A-Z', icon: 'fas fa-sort-alpha-down' },
      { value: 'destacado', label: 'Destacados', icon: 'fas fa-star' },
      { value: 'proximoVencer', label: 'Próximo a vencer', icon: 'fas fa-hourglass-end' }
    ];
  }

  // ===== SEARCH SUGGESTIONS =====
  getPopularSearches() {
    return [
      'BMW',
      'Mercedes',
      'Audi',
      'Toyota',
      'Honda',
      'Nissan',
      'Volkswagen',
      'Ford',
      'Chevrolet',
      'Mazda'
    ];
  }

  getRecentSearches() {
    const searches = localStorage.getItem('recent_searches');
    return searches ? JSON.parse(searches) : [];
  }

  addRecentSearch(query) {
    if (!query || query.trim().length < 2) return;
    
    const recent = this.getRecentSearches();
    const newSearch = query.trim();
    
    // Remove if already exists
    const filtered = recent.filter(search => search !== newSearch);
    
    // Add to beginning
    filtered.unshift(newSearch);
    
    // Keep only last 10
    const updated = filtered.slice(0, 10);
    
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  }

  clearRecentSearches() {
    localStorage.removeItem('recent_searches');
  }

  // ===== SEARCH ANALYTICS =====
  logSearch(query, filters, resultsCount) {
    // Track search for analytics
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: query,
        results_count: resultsCount
      });
    }

    // Store in local storage for internal analytics
    const searchLog = {
      query,
      filters,
      resultsCount,
      timestamp: new Date().toISOString()
    };

    const logs = JSON.parse(localStorage.getItem('search_logs') || '[]');
    logs.push(searchLog);
    
    // Keep only last 100 searches
    const updated = logs.slice(-100);
    localStorage.setItem('search_logs', JSON.stringify(updated));
  }

  // ===== SEARCH VALIDATION =====
  validateSearchParams(params) {
    const errors = [];

    if (params.precioMin && params.precioMax && params.precioMin > params.precioMax) {
      errors.push('El precio mínimo no puede ser mayor al precio máximo');
    }

    if (params.anoMin && params.anoMax && params.anoMin > params.anoMax) {
      errors.push('El año mínimo no puede ser mayor al año máximo');
    }

    if (params.pageSize && (params.pageSize < 1 || params.pageSize > 100)) {
      errors.push('El tamaño de página debe estar entre 1 y 100');
    }

    if (params.page && params.page < 1) {
      errors.push('El número de página debe ser mayor a 0');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // ===== URL MANAGEMENT =====
  buildSearchUrl(filters) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    return `/search?${params.toString()}`;
  }

  parseUrlParams(searchParams) {
    const filters = {};
    
    searchParams.forEach((value, key) => {
      if (value) {
        // Convert numeric values
        if (['precioMin', 'precioMax', 'anoMin', 'anoMax', 'kilometrajeMax', 'page', 'pageSize'].includes(key)) {
          filters[key] = parseInt(value);
        } else {
          filters[key] = value;
        }
      }
    });

    return filters;
  }
}

export default new SearchService();