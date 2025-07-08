import React, { useState, useEffect } from 'react';

import { TIPOS_CAMPO } from '../../types/api.types';
import categoryService from '../../services/categoryService';

export const DynamicField = ({ 
  campo, 
  value, 
  onChange, 
  error, 
  disabled = false,
  className = '' 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar opciones para campos de tipo select
  useEffect(() => {
    if (campo.tipo === TIPOS_CAMPO.SELECT || campo.tipo === TIPOS_CAMPO.MULTISELECT) {
      loadOptions();
    }
  }, [campo.listaID, campo.tipo]);

  const loadOptions = async () => {
    if (!campo.listaID) return;
    
    setLoading(true);
    try {
      const response = await categoryService.getListaItems(campo.listaID);
      if (response.success) {
        setOptions(response.data || []);
      }
    } catch (error) {
      console.error('Error loading options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  const renderField = () => {
    const baseProps = {
      id: `campo_${campo.campoID}`,
      name: `campo_${campo.campoID}`,
      disabled: disabled || loading,
      className: `form-control ${className} ${error ? 'is-invalid' : ''}`,
      'aria-describedby': error ? `campo_${campo.campoID}_error` : undefined
    };

    switch (campo.tipo) {
      case TIPOS_CAMPO.TEXT:
        return (
          <input
            {...baseProps}
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
          />
        );

      case TIPOS_CAMPO.NUMBER:
        return (
          <input
            {...baseProps}
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
            step="any"
          />
        );

      case TIPOS_CAMPO.DATE:
        return (
          <input
            {...baseProps}
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );

      case TIPOS_CAMPO.TEXTAREA:
        return (
          <textarea
            {...baseProps}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
            rows={4}
          />
        );

      case TIPOS_CAMPO.SELECT:
        return (
          <select
            {...baseProps}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="">Seleccione {campo.label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option.listaItemID} value={option.nombre}>
                {option.nombre}
              </option>
            ))}
          </select>
        );

      case TIPOS_CAMPO.MULTISELECT:
        return (
          <MultiSelect
            {...baseProps}
            value={Array.isArray(value) ? value : []}
            options={options}
            onChange={handleChange}
            placeholder={`Seleccione ${campo.label.toLowerCase()}`}
          />
        );

      case TIPOS_CAMPO.CHECKBOX:
        return (
          <div className="form-check">
            <input
              {...baseProps}
              type="checkbox"
              className={`form-check-input ${error ? 'is-invalid' : ''}`}
              checked={Boolean(value)}
              onChange={(e) => handleChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor={baseProps.id}>
              {campo.label}
            </label>
          </div>
        );

      default:
        return (
          <input
            {...baseProps}
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="dynamic-field mb-3">
      {campo.tipo !== TIPOS_CAMPO.CHECKBOX && (
        <label htmlFor={`campo_${campo.campoID}`} className="form-label">
          <i className="fas fa-tag text-primary me-2"></i>
          {campo.label}
          {campo.requerido && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {error && (
        <div id={`campo_${campo.campoID}_error`} className="invalid-feedback">
          {error}
        </div>
      )}
      
      {loading && campo.tipo === TIPOS_CAMPO.SELECT && (
        <small className="text-muted">
          <i className="fas fa-spinner fa-spin me-1"></i>
          Cargando opciones...
        </small>
      )}
    </div>
  );
};

// Componente para campos de selección múltiple
const MultiSelect = ({ value, options, onChange, placeholder, disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value || []);

  useEffect(() => {
    setSelectedOptions(value || []);
  }, [value]);

  const toggleOption = (optionValue) => {
    const newSelection = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(v => v !== optionValue)
      : [...selectedOptions, optionValue];
    
    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  const removeOption = (optionValue, e) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter(v => v !== optionValue);
    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="multi-select-container">
      <div 
        className={`multi-select-display form-control ${className} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ minHeight: '38px', cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {selectedOptions.length > 0 ? (
          <div className="selected-options d-flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span key={option} className="badge bg-primary d-flex align-items-center">
                {option}
                {!disabled && (
                  <button 
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    style={{ fontSize: '0.6rem' }}
                    onClick={(e) => removeOption(option, e)}
                    aria-label="Remove"
                  ></button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted">{placeholder}</span>
        )}
        
        {!disabled && (
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} position-absolute end-0 top-50 translate-middle-y me-2`}></i>
        )}
      </div>
      
      {isOpen && !disabled && (
        <div className="multi-select-dropdown position-absolute w-100 bg-white border rounded shadow-sm mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
          {options.map((option) => (
            <div 
              key={option.listaItemID}
              className={`multi-select-option p-2 border-bottom cursor-pointer ${selectedOptions.includes(option.nombre) ? 'bg-light' : ''}`}
              onClick={() => toggleOption(option.nombre)}
              style={{ cursor: 'pointer' }}
            >
              <input 
                type="checkbox" 
                checked={selectedOptions.includes(option.nombre)}
                readOnly
                className="me-2"
              />
              {option.nombre}
            </div>
          ))}
          
          {options.length === 0 && (
            <div className="p-2 text-muted text-center">
              No hay opciones disponibles
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicField;