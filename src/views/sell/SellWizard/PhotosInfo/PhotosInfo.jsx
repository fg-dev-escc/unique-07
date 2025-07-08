import React from 'react';

import { photosInfoConfig } from './photosInfoConfig';

const PhotosInfo = ({ formData, updateFormData }) => {
  // config
  const { data } = photosInfoConfig;

  // handlers
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      updateFormData('images', [...formData.images, ...files].slice(0, 5));
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData('images', newImages);
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <h5 className="mb-3">
          <i className="fas fa-camera me-2"></i>
          {data.title}
        </h5>
        <p className="text-muted">
          {data.description}
        </p>
      </div>
      
      {/* Upload Area */}
      <div className="col-md-12">
        <div className="upload-area">
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt"></i>
            <h5>{data.uploadArea.title}</h5>
            <p>{data.uploadArea.subtitle}</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-input"
            />
          </div>
        </div>
      </div>

      {/* Preview Images */}
      {formData.images.length > 0 && (
        <div className="col-md-12 mt-4">
          <h6>{data.preview.title}</h6>
          <div className="row">
            {formData.images.map((image, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index + 1}`}
                    className="preview-img"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="col-md-12 mt-4">
        <div className="summary-card">
          <h6><i className="fas fa-check-circle me-2"></i>{data.summary.title}</h6>
          <div className="row">
            <div className="col-md-6">
              <p><strong>{data.summary.fields.vendedor}:</strong> {formData.nombre}</p>
              <p><strong>{data.summary.fields.email}:</strong> {formData.email}</p>
              <p><strong>{data.summary.fields.telefono}:</strong> {formData.telefono}</p>
            </div>
            <div className="col-md-6">
              <p><strong>{data.summary.fields.vehiculo}:</strong> {formData.marca} {formData.modelo} {formData.año}</p>
              <p><strong>{data.summary.fields.precio}:</strong> ${formData.precio}</p>
              <p><strong>{data.summary.fields.fotos}:</strong> {formData.images.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosInfo;