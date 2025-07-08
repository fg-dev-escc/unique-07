import React, { useState, useEffect } from 'react';

import DynamicField from './DynamicField';
import categoryService from '../../services/categoryService';

export const DynamicForm = ({ 
  subcategoriaID, 
  articuloID = null,
  onSubmit, 
  onCancel,
  initialValues = {},
  disabled = false,
  submitButtonText = 'Guardar',
  showCancelButton = true 
}) => {
  const [campos, setCampos] = useState([]);
  const [valores, setValores] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subcategoriaID) {
      loadCampos();
    }
  }, [subcategoriaID]);

  useEffect(() => {
    if (articuloID && campos.length > 0) {
      loadValoresExistentes();
    }
  }, [articuloID, campos]);

  useEffect(() => {
    if (campos.length > 0) {
      initializeValues();
    }
  }, [campos, initialValues]);

  const loadCampos = async () => {
    setLoading(true);
    try {
      const response = await categoryService.getCamposBySubcategoria(subcategoriaID);
      if (response.success) {
        // Ordenar campos por orden
        const sortedCampos = (response.data || []).sort((a, b) => (a.orden || 0) - (b.orden || 0));
        setCampos(sortedCampos);
      } else {
        console.error('Error loading campos:', response.message);
      }
    } catch (error) {
      console.error('Error loading campos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadValoresExistentes = async () => {
    try {
      const response = await categoryService.getCamposValor(articuloID);
      if (response.success && response.data) {
        const valoresExistentes = {};
        response.data.forEach(valor => {
          const campo = campos.find(c => c.campoID === valor.campoID);
          if (campo) {
            valoresExistentes[`campo_${valor.campoID}`] = categoryService.parseFieldValue(valor.valor, campo.tipo);
          }
        });
        setValores(prev => ({ ...prev, ...valoresExistentes }));
      }
    } catch (error) {
      console.error('Error loading existing values:', error);
    }
  };

  const initializeValues = () => {
    const initializedValues = categoryService.buildInitialValues(campos, []);
    setValores(prev => ({ ...initializedValues, ...prev, ...initialValues }));
  };

  const handleFieldChange = (fieldName, value) => {
    setValores(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    campos.forEach(campo => {
      const fieldName = `campo_${campo.campoID}`;
      const value = valores[fieldName];

      // Validar campos requeridos
      if (campo.requerido) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[fieldName] = `${campo.label} es requerido`;
          return;
        }
      }

      // Validar tipo de campo
      if (value && !categoryService.validateFieldValue(value, campo.tipo)) {
        newErrors[fieldName] = `${campo.label} tiene un formato inválido`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const camposValor = categoryService.processFormValues(valores, campos);
      
      if (onSubmit) {
        await onSubmit(camposValor);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando campos...</span>
        </div>
        <p className="mt-2">Cargando formulario...</p>
      </div>
    );
  }

  if (campos.length === 0) {
    return (
      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        No hay campos adicionales configurados para esta categoría.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <div className="row">
        {campos.map((campo) => (
          <div 
            key={campo.campoID} 
            className={`col-md-${getColumnSize(campo.tipo)}`}
          >
            <DynamicField
              campo={campo}
              value={valores[`campo_${campo.campoID}`]}
              onChange={(value) => handleFieldChange(`campo_${campo.campoID}`, value)}
              error={errors[`campo_${campo.campoID}`]}
              disabled={disabled}
            />
          </div>
        ))}
      </div>

      {/* Form Actions */}
      <div className="form-actions mt-4 d-flex gap-2">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={disabled || saving}
        >
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Guardando...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              {submitButtonText}
            </>
          )}
        </button>

        {showCancelButton && onCancel && (
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={handleCancel}
            disabled={saving}
          >
            <i className="fas fa-times me-2"></i>
            Cancelar
          </button>
        )}
      </div>

      {/* Form Summary for Debug (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4">
          <summary className="btn btn-link p-0">Debug Info</summary>
          <div className="mt-2">
            <h6>Campos:</h6>
            <pre className="bg-light p-2 rounded">{JSON.stringify(campos, null, 2)}</pre>
            <h6>Valores:</h6>
            <pre className="bg-light p-2 rounded">{JSON.stringify(valores, null, 2)}</pre>
            <h6>Errores:</h6>
            <pre className="bg-light p-2 rounded">{JSON.stringify(errors, null, 2)}</pre>
          </div>
        </details>
      )}
    </form>
  );
};

// Helper function to determine column size based on field type
const getColumnSize = (tipo) => {
  switch (tipo) {
    case 'textarea':
      return 12; // Full width for textareas
    case 'checkbox':
      return 6;  // Half width for checkboxes
    case 'select':
    case 'multiselect':
      return 6;  // Half width for selects
    default:
      return 6;  // Half width for most fields
  }
};

export default DynamicForm;