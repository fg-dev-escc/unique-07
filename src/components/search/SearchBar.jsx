import React, { useState, useEffect, useRef } from 'react';

import searchService from '../../services/searchService';

export const SearchBar = ({
  onSearch,
  onFilterToggle,
  initialQuery = '',
  placeholder = 'Buscar vehículos...',
  showFilters = true,
  showSuggestions = true,
  autoFocus = false,
  className = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (showSuggestions) {
      setRecentSearches(searchService.getRecentSearches());
      setPopularSearches(searchService.getPopularSearches());
    }
  }, [showSuggestions]);

  // Debounced autocomplete
  useEffect(() => {
    if (query.length >= 2) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const response = await searchService.autocomplete(query);
          if (response.success) {
            setSuggestions(response.data || []);
          }
        } catch (error) {
          console.error('Autocomplete error:', error);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (showSuggestions) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur
  const handleInputBlur = (e) => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  // Perform search
  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    const trimmedQuery = searchQuery.trim();
    setQuery(trimmedQuery);
    setShowSuggestions(false);
    
    // Add to recent searches
    searchService.addRecentSearch(trimmedQuery);
    
    // Call search handler
    if (onSearch) {
      onSearch(trimmedQuery);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    performSearch(suggestion);
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    if (onSearch) {
      onSearch('');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const renderSuggestions = () => {
    const hasQuery = query.length >= 2;
    const hasAutocompleteSuggestions = suggestions.length > 0;
    const showRecent = !hasQuery && recentSearches.length > 0;
    const showPopular = !hasQuery && popularSearches.length > 0;

    if (!hasAutocompleteSuggestions && !showRecent && !showPopular) {
      return null;
    }

    return (
      <div 
        ref={suggestionsRef}
        className="search-suggestions position-absolute w-100 bg-white border rounded-bottom shadow-lg"
        style={{ top: '100%', zIndex: 1000, maxHeight: '400px', overflowY: 'auto' }}
      >
        {/* Loading */}
        {loading && (
          <div className="p-3 text-center">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Buscando...</span>
            </div>
            <small className="text-muted ms-2">Buscando sugerencias...</small>
          </div>
        )}

        {/* Autocomplete Suggestions */}
        {hasAutocompleteSuggestions && !loading && (
          <div className="suggestion-section">
            <div className="suggestion-header px-3 py-2 bg-light border-bottom">
              <small className="text-muted fw-bold">
                <i className="fas fa-search me-2"></i>
                Sugerencias
              </small>
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item px-3 py-2 cursor-pointer border-bottom"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.classList.add('bg-light')}
                onMouseLeave={(e) => e.target.classList.remove('bg-light')}
              >
                <i className="fas fa-search text-muted me-2"></i>
                <span dangerouslySetInnerHTML={{
                  __html: suggestion.replace(
                    new RegExp(`(${query})`, 'gi'),
                    '<strong>$1</strong>'
                  )
                }}></span>
              </div>
            ))}
          </div>
        )}

        {/* Recent Searches */}
        {showRecent && (
          <div className="suggestion-section">
            <div className="suggestion-header px-3 py-2 bg-light border-bottom d-flex justify-content-between align-items-center">
              <small className="text-muted fw-bold">
                <i className="fas fa-history me-2"></i>
                Búsquedas recientes
              </small>
              <button
                type="button"
                className="btn btn-sm btn-link text-muted p-0"
                onClick={() => {
                  searchService.clearRecentSearches();
                  setRecentSearches([]);
                }}
                title="Limpiar historial"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {recentSearches.slice(0, 5).map((search, index) => (
              <div
                key={index}
                className="suggestion-item px-3 py-2 cursor-pointer border-bottom"
                onClick={() => handleSuggestionClick(search)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.classList.add('bg-light')}
                onMouseLeave={(e) => e.target.classList.remove('bg-light')}
              >
                <i className="fas fa-history text-muted me-2"></i>
                {search}
              </div>
            ))}
          </div>
        )}

        {/* Popular Searches */}
        {showPopular && (
          <div className="suggestion-section">
            <div className="suggestion-header px-3 py-2 bg-light border-bottom">
              <small className="text-muted fw-bold">
                <i className="fas fa-fire me-2"></i>
                Búsquedas populares
              </small>
            </div>
            {popularSearches.slice(0, 5).map((search, index) => (
              <div
                key={index}
                className="suggestion-item px-3 py-2 cursor-pointer border-bottom"
                onClick={() => handleSuggestionClick(search)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.classList.add('bg-light')}
                onMouseLeave={(e) => e.target.classList.remove('bg-light')}
              >
                <i className="fas fa-fire text-muted me-2"></i>
                {search}
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {hasQuery && !loading && !hasAutocompleteSuggestions && (
          <div className="p-3 text-center">
            <i className="fas fa-search text-muted mb-2"></i>
            <p className="text-muted mb-0">No se encontraron sugerencias</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`search-bar position-relative ${className}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            className="form-control search-input"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          
          {/* Clear button */}
          {query && (
            <button
              type="button"
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
              onClick={handleClear}
              style={{ zIndex: 5, right: showFilters ? '90px' : '50px' }}
              title="Limpiar búsqueda"
            >
              <i className="fas fa-times"></i>
            </button>
          )}

          {/* Filter toggle button */}
          {showFilters && onFilterToggle && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onFilterToggle}
              title="Filtros de búsqueda"
            >
              <i className="fas fa-filter"></i>
            </button>
          )}

          {/* Search button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            title="Buscar"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && renderSuggestions()}
    </div>
  );
};

export default SearchBar;