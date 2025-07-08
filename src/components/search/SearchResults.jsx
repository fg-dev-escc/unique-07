import React, { useState } from 'react';

import { AuctionTimer } from '../ui/AuctionTimer';
import searchService from '../../services/searchService';

export const SearchResults = ({
  results = [],
  pagination = null,
  loading = false,
  error = null,
  filters = {},
  onPageChange,
  onSortChange,
  onFiltersChange,
  showFilters = true,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  if (loading) {
    return (
      <div className={`search-results ${className}`}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando resultados...</span>
          </div>
          <p>Buscando vehículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`search-results ${className}`}>
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  const handleSortChange = (newSortBy) => {
    if (onSortChange) {
      onSortChange(newSortBy);
    }
  };

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const clearFilter = (filterKey) => {
    const newFilters = searchService.clearFilter(filters, filterKey);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = searchService.clearAllFilters();
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderActiveFilters = () => {
    const activeFilters = searchService.formatFiltersForDisplay(filters);
    
    if (activeFilters.length === 0) return null;

    return (
      <div className="active-filters mb-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="text-muted">Filtros activos:</span>
          {activeFilters.map((filter) => (
            <span key={filter.key} className="badge bg-primary d-flex align-items-center">
              {filter.label}: {filter.value}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                style={{ fontSize: '0.6rem' }}
                onClick={() => clearFilter(filter.key)}
                aria-label="Remove filter"
              ></button>
            </span>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={clearAllFilters}
          >
            <i className="fas fa-eraser me-1"></i>
            Limpiar todo
          </button>
        </div>
      </div>
    );
  };

  const renderResultsHeader = () => (
    <div className="results-header d-flex justify-content-between align-items-center mb-3">
      <div className="results-info">
        <h5 className="mb-1">
          {pagination?.totalRegistros || 0} vehículos encontrados
        </h5>
        {filters.query && (
          <p className="text-muted mb-0">
            Resultados para: <strong>"{filters.query}"</strong>
          </p>
        )}
      </div>

      <div className="results-controls d-flex align-items-center gap-2">
        {/* Sort Selector */}
        <select
          className="form-select form-select-sm"
          style={{ width: 'auto' }}
          value={filters.sortBy || 'fecha'}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          {searchService.getSortOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* View Mode Toggle */}
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-outline-secondary btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista en cuadrícula"
          >
            <i className="fas fa-th"></i>
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary btn-sm ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Vista en lista"
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCarCard = (car, isListView = false) => (
    <div key={car.articuloID} className={isListView ? 'col-12' : 'col-lg-6 col-xl-4'}>
      <div className={`car-item position-relative ${isListView ? 'car-item-list' : ''}`}>
        {/* Timer badge */}
        {car.fechaFin && (
          <AuctionTimer endDate={car.fechaFin} />
        )}

        <div className={`car-content ${isListView ? 'd-flex' : ''}`}>
          {/* Image */}
          <div className={`car-img ${isListView ? 'flex-shrink-0 me-3' : ''}`} style={isListView ? { width: '200px' } : {}}>
            <img 
              src={car.urlImgPrincipal || '/assets/img/car/default.jpg'} 
              alt={car.nombre || 'Vehicle'} 
              className="w-100"
              style={{ height: isListView ? '150px' : '200px', objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div className={`car-details ${isListView ? 'flex-grow-1' : ''}`}>
            <div className="car-top">
              <h4>
                <a href={`/subasta/${car.articuloID}`} className="text-decoration-none">
                  {car.nombre || 'Vehicle'}
                </a>
              </h4>
              <span className="rating">
                <i className="fas fa-star"></i> 5.0
              </span>
            </div>

            {/* Vehicle specs */}
            <ul className="car-list">
              <li><i className="far fa-car"></i>Modelo: {car.modelo || 'N/A'}</li>
              <li><i className="far fa-calendar"></i>Año: {car.ano || 'N/A'}</li>
              <li><i className="far fa-gas-pump"></i>{car.combustible || 'N/A'}</li>
              <li><i className="far fa-road"></i>{car.kilometraje ? `${car.kilometraje} km` : 'N/A'}</li>
              <li><i className="far fa-cogs"></i>{car.transmision || 'N/A'}</li>
            </ul>

            {/* Description */}
            {isListView && car.descripcion && (
              <p className="car-description text-muted">
                {car.descripcion.length > 150 
                  ? `${car.descripcion.substring(0, 150)}...` 
                  : car.descripcion}
              </p>
            )}

            {/* Footer */}
            <div className="car-footer">
              <span className="car-price">
                {formatPrice(car.montoSalida || 0)}
                <sub>/subasta</sub>
              </span>
              <div className="car-actions">
                <button className="btn btn-outline-primary btn-sm me-2" title="Agregar a favoritos">
                  <i className="far fa-heart"></i>
                </button>
                <a href={`/subasta/${car.articuloID}`} className="btn btn-primary btn-sm">
                  Ver Subasta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPagination = () => {
    if (!pagination || pagination.totalPaginas <= 1) return null;

    const currentPage = pagination.paginaActual;
    const totalPages = pagination.totalPaginas;
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <nav aria-label="Navegación de resultados">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${!pagination.tienePaginaAnterior ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.tienePaginaAnterior}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => handlePageChange(1)}>
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {pages.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li className={`page-item ${!pagination.tienePaginaSiguiente ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.tienePaginaSiguiente}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>

        <div className="text-center text-muted mt-2">
          <small>
            Mostrando {pagination.registroInicial} - {pagination.registroFinal} de {pagination.totalRegistros} resultados
          </small>
        </div>
      </nav>
    );
  };

  return (
    <div className={`search-results ${className}`}>
      {/* Active Filters */}
      {renderActiveFilters()}

      {/* Results Header */}
      {renderResultsHeader()}

      {/* Results */}
      {results.length === 0 ? (
        <div className="no-results text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h5>No se encontraron vehículos</h5>
          <p className="text-muted">
            Intenta ajustar tus filtros de búsqueda o prueba con términos diferentes.
          </p>
          {searchService.getActiveFiltersCount(filters) > 0 && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={clearAllFilters}
            >
              <i className="fas fa-eraser me-2"></i>
              Limpiar todos los filtros
            </button>
          )}
        </div>
      ) : (
        <>
          <div className={`results-grid ${viewMode === 'list' ? 'results-list' : ''}`}>
            <div className="row">
              {results.map((car) => renderCarCard(car, viewMode === 'list'))}
            </div>
          </div>

          {/* Pagination */}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default SearchResults;