import React from 'react';

import { carInfoConfig } from './carInfoConfig';

const CarInfo = ({ formData, updateFormData }) => {
  // config
  const { data } = carInfoConfig;

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <h5 className="mb-3">
          <i className="fas fa-car me-2"></i>
          {data.title}
        </h5>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-industry me-2"></i>
            {data.fields.marca.label}
          </label>
          <select 
            className="form-control"
            value={formData.marca}
            onChange={(e) => updateFormData('marca', e.target.value)}
          >
            <option value="">{data.fields.marca.placeholder}</option>
            {data.fields.marca.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-car-side me-2"></i>
            {data.fields.modelo.label}
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.modelo}
            onChange={(e) => updateFormData('modelo', e.target.value)}
            placeholder={data.fields.modelo.placeholder}
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-calendar me-2"></i>
            {data.fields.año.label}
          </label>
          <select 
            className="form-control"
            value={formData.año}
            onChange={(e) => updateFormData('año', e.target.value)}
          >
            <option value="">{data.fields.año.placeholder}</option>
            {Array.from({length: 30}, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-gas-pump me-2"></i>
            {data.fields.combustible.label}
          </label>
          <select 
            className="form-control"
            value={formData.combustible}
            onChange={(e) => updateFormData('combustible', e.target.value)}
          >
            <option value="">{data.fields.combustible.placeholder}</option>
            {data.fields.combustible.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-cogs me-2"></i>
            {data.fields.transmision.label}
          </label>
          <select 
            className="form-control"
            value={formData.transmision}
            onChange={(e) => updateFormData('transmision', e.target.value)}
          >
            <option value="">{data.fields.transmision.placeholder}</option>
            {data.fields.transmision.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label>
            <i className="fas fa-road me-2"></i>
            {data.fields.kilometraje.label}
          </label>
          <input
            type="number"
            className="form-control"
            value={formData.kilometraje}
            onChange={(e) => updateFormData('kilometraje', e.target.value)}
            placeholder={data.fields.kilometraje.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-palette me-2"></i>
            {data.fields.color.label}
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.color}
            onChange={(e) => updateFormData('color', e.target.value)}
            placeholder={data.fields.color.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-dollar-sign me-2"></i>
            {data.fields.precio.label}
          </label>
          <input
            type="number"
            className="form-control"
            value={formData.precio}
            onChange={(e) => updateFormData('precio', e.target.value)}
            placeholder={data.fields.precio.placeholder}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="form-group">
          <label>
            <i className="fas fa-comment me-2"></i>
            {data.fields.descripcion.label}
          </label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.descripcion}
            onChange={(e) => updateFormData('descripcion', e.target.value)}
            placeholder={data.fields.descripcion.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default CarInfo;