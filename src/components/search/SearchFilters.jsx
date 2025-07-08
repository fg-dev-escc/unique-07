import React, { useState, useEffect } from 'react';

import { get } from '../../services/apiService';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { COMBUSTIBLES, TRANSMISIONES } from '../../types/api.types';
import searchService from '../../services/searchService';

export const SearchFilters = ({
  filters = {},
  onFiltersChange,
  onClearFilters,
  onClose,
  isOpen = false,
  className = ''
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (localFilters.categoria) {
      loadSubcategorias();
    } else {
      setSubcategorias([]);
    }
  }, [localFilters.categoria]);

  useEffect(() => {
    if (localFilters.estado) {
      loadMunicipios();
    } else {
      setMunicipios([]);
    }
  }, [localFilters.estado]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [categoriasRes, estadosRes] = await Promise.all([
        get(API_ENDPOINTS.GENERICOS.GET_CATEGORIAS_SELECT),
        get(API_ENDPOINTS.GENERICOS.GET_ESTADOS)
      ]);

      if (categoriasRes.success) {
        setCategorias(categoriasRes.data || []);
      }

      if (estadosRes.success) {
        setEstados(estadosRes.data || []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubcategorias = async () => {
    try {
      const response = await get(API_ENDPOINTS.CATEGORIAS.GET_SUBCATEGORIAS(localFilters.categoria));
      if (response.success) {
        setSubcategorias(response.data || []);
      }
    } catch (error) {
      console.error('Error loading subcategorias:', error);
    }
  };

  const loadMunicipios = async () => {
    try {
      const response = await get(API_ENDPOINTS.GENERICOS.GET_MUNICIPIOS(localFilters.estado));
      if (response.success) {
        setMunicipios(response.data || []);
      }
    } catch (error) {
      console.error('Error loading municipios:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: value || undefined
    };

    // Clear dependent filters
    if (key === 'categoria') {
      newFilters.subcategoria = undefined;
    }
    if (key === 'estado') {
      newFilters.municipio = undefined;
    }

    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Remove empty values
    const cleanFilters = Object.keys(localFilters).reduce((acc, key) => {
      if (localFilters[key] !== undefined && localFilters[key] !== null && localFilters[key] !== '') {
        acc[key] = localFilters[key];
      }
      return acc;
    }, {});

    if (onFiltersChange) {
      onFiltersChange(cleanFilters);
    }
  };

  const handleClearAll = () => {
    const clearedFilters = searchService.clearAllFilters();
    setLocalFilters(clearedFilters);
    
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const getActiveFiltersCount = () => {
    return searchService.getActiveFiltersCount(localFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  if (!isOpen) return null;

  return (
    <div className={`search-filters ${className}`}>
      <div className="filters-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">
          <i className="fas fa-filter me-2"></i>
          Filtros de Búsqueda
        </h5>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={onClose}
          title="Cerrar filtros"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="filters-body p-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando filtros...</span>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {/* Categoría */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-tag text-primary me-2"></i>
                Categoría
              </label>
              <select
                className="form-select"
                value={localFilters.categoria || ''}
                onChange={(e) => handleFilterChange('categoria', e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.categoriaID} value={categoria.categoriaID}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategoría */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-tags text-primary me-2"></i>
                Subcategoría
              </label>
              <select
                className="form-select"
                value={localFilters.subcategoria || ''}
                onChange={(e) => handleFilterChange('subcategoria', e.target.value)}
                disabled={!localFilters.categoria || subcategorias.length === 0}
              >
                <option value="">Todas las subcategorías</option>
                {subcategorias.map((subcategoria) => (
                  <option key={subcategoria.subcategoriaID} value={subcategoria.subcategoriaID}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Rango de Precio */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-dollar-sign text-primary me-2"></i>
                Precio Mínimo
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 50000"
                value={localFilters.precioMin || ''}
                onChange={(e) => handleFilterChange('precioMin', e.target.value)}
                min="0"
                step="1000"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-dollar-sign text-primary me-2"></i>
                Precio Máximo
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 500000"
                value={localFilters.precioMax || ''}
                onChange={(e) => handleFilterChange('precioMax', e.target.value)}
                min="0"
                step="1000"
              />
            </div>

            {/* Estado */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                Estado
              </label>
              <select
                className="form-select"
                value={localFilters.estado || ''}
                onChange={(e) => handleFilterChange('estado', e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estados.map((estado) => (
                  <option key={estado.estadoID} value={estado.estadoID}>
                    {estado.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Municipio */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-city text-primary me-2"></i>
                Municipio
              </label>
              <select
                className="form-select"
                value={localFilters.municipio || ''}
                onChange={(e) => handleFilterChange('municipio', e.target.value)}
                disabled={!localFilters.estado || municipios.length === 0}
              >
                <option value="">Todos los municipios</option>
                {municipios.map((municipio) => (
                  <option key={municipio.municipioID} value={municipio.municipioID}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Marca */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-car text-primary me-2"></i>
                Marca
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Toyota, BMW, Mercedes"
                value={localFilters.marca || ''}
                onChange={(e) => handleFilterChange('marca', e.target.value)}
              />
            </div>

            {/* Modelo */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-car-side text-primary me-2"></i>
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Corolla, Serie 3, Clase C"
                value={localFilters.modelo || ''}
                onChange={(e) => handleFilterChange('modelo', e.target.value)}
              />
            </div>

            {/* Año Mínimo */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-calendar text-primary me-2"></i>
                Año Mínimo
              </label>
              <select
                className="form-select"
                value={localFilters.anoMin || ''}
                onChange={(e) => handleFilterChange('anoMin', e.target.value)}
              >
                <option value="">Cualquier año</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Año Máximo */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-calendar text-primary me-2"></i>
                Año Máximo
              </label>
              <select
                className="form-select"
                value={localFilters.anoMax || ''}
                onChange={(e) => handleFilterChange('anoMax', e.target.value)}
              >
                <option value="">Cualquier año</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Combustible */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-gas-pump text-primary me-2"></i>
                Combustible
              </label>
              <select
                className="form-select"
                value={localFilters.combustible || ''}
                onChange={(e) => handleFilterChange('combustible', e.target.value)}
              >
                <option value="">Cualquier combustible</option>
                {COMBUSTIBLES.map((combustible) => (
                  <option key={combustible} value={combustible}>
                    {combustible}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmisión */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-cogs text-primary me-2"></i>
                Transmisión
              </label>
              <select
                className="form-select"
                value={localFilters.transmision || ''}
                onChange={(e) => handleFilterChange('transmision', e.target.value)}
              >
                <option value="">Cualquier transmisión</option>
                {TRANSMISIONES.map((transmision) => (
                  <option key={transmision} value={transmision}>
                    {transmision}
                  </option>
                ))}
              </select>
            </div>

            {/* Kilometraje Máximo */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-tachometer-alt text-primary me-2"></i>
                Kilometraje Máximo
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 100000"
                value={localFilters.kilometrajeMax || ''}
                onChange={(e) => handleFilterChange('kilometrajeMax', e.target.value)}
                min="0"
                step="1000"
              />
            </div>

            {/* Ordenar por */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-sort text-primary me-2"></i>
                Ordenar por
              </label>
              <select
                className="form-select"
                value={localFilters.sortBy || 'fecha'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {searchService.getSortOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="filters-footer p-3 border-top bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleClearAll}
            disabled={getActiveFiltersCount() === 0}
          >
            <i className="fas fa-eraser me-2"></i>
            Limpiar Filtros
            {getActiveFiltersCount() > 0 && (
              <span className="badge bg-secondary ms-2">{getActiveFiltersCount()}</span>
            )}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleApplyFilters}
          >
            <i className="fas fa-search me-2"></i>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;