import React from 'react';

import { personalInfoConfig } from './personalInfoConfig';

const PersonalInfo = ({ formData, updateFormData }) => {
  // config
  const { data } = personalInfoConfig;

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <h5 className="mb-3">
          <i className="fas fa-user me-2"></i>
          {data.title}
        </h5>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-user me-2"></i>
            {data.fields.nombre.label}
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={(e) => updateFormData('nombre', e.target.value)}
            placeholder={data.fields.nombre.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-envelope me-2"></i>
            {data.fields.email.label}
          </label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder={data.fields.email.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-phone me-2"></i>
            {data.fields.telefono.label}
          </label>
          <input
            type="tel"
            className="form-control"
            value={formData.telefono}
            onChange={(e) => updateFormData('telefono', e.target.value)}
            placeholder={data.fields.telefono.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;