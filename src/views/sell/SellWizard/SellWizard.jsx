import React, { useState } from 'react';

import PersonalInfo from './PersonalInfo/PersonalInfo';
import CarInfo from './CarInfo/CarInfo';
import PhotosInfo from './PhotosInfo/PhotosInfo';
import SellConfirmation from '../SellConfirmation/SellConfirmation';

import { sellWizardConfig } from './sellWizardConfig';

const SellWizard = () => {
  // state
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    email: '',
    telefono: '',
    // Información del auto
    marca: '',
    modelo: '',
    año: '',
    combustible: '',
    transmision: '',
    kilometraje: '',
    color: '',
    motor: '',
    precio: '',
    descripcion: '',
    // Imagen
    images: []
  });

  // config
  const { data } = sellWizardConfig;

  // handlers
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    setShowConfirmation(true);
  };

  const handleNewSubmission = () => {
    setShowConfirmation(false);
    setCurrentStep(1);
    setFormData({
      // Datos personales
      nombre: '',
      email: '',
      telefono: '',
      // Información del auto
      marca: '',
      modelo: '',
      año: '',
      combustible: '',
      transmision: '',
      kilometraje: '',
      color: '',
      motor: '',
      precio: '',
      descripcion: '',
      // Imagen
      images: []
    });
  };

  if (showConfirmation) {
    return (
      <SellConfirmation 
        formData={formData}
        onNewSubmission={handleNewSubmission}
      />
    );
  }

  return (
    <div className="sell-wizard-area py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="site-heading">
                <span className="site-title-tagline">
                  <i className="fas fa-car"></i> {data.header.tagline}
                </span>
                <h2 className="site-title">
                  {data.header.title.before} <span>{data.header.title.highlight}</span> {data.header.title.after}
                </h2>
                <p>{data.header.description}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="row mb-5">
              {data.steps.map((step, index) => (
                <div key={step.number} className="col-md-4">
                  <div className={`wizard-step ${currentStep >= step.number ? 'active' : ''}`}>
                    <div className="wizard-step-icon">
                      <i className={step.icon}></i>
                    </div>
                    <div className="wizard-step-content">
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </div>
                    {index < data.steps.length - 1 && (
                      <div className="wizard-step-connector"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="wizard-form-card">
              <div className="wizard-form-header">
                <h4>
                  <i className={data.steps[currentStep - 1].icon}></i>
                  {data.steps[currentStep - 1].title}
                </h4>
              </div>
              
              <div className="wizard-form-body">
                {/* Step Components */}
                {currentStep === 1 && (
                  <PersonalInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                
                {currentStep === 2 && (
                  <CarInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                
                {currentStep === 3 && (
                  <PhotosInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="wizard-form-footer">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className={`theme-btn ${currentStep === 1 ? 'disabled' : ''}`}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    {data.navigation.previous}
                  </button>
                  
                  <div className="step-indicator">
                    {data.navigation.stepIndicator} {currentStep} {data.navigation.of} {data.steps.length}
                  </div>
                  
                  {currentStep < data.steps.length ? (
                    <button
                      type="button"
                      className="theme-btn"
                      onClick={nextStep}
                    >
                      {data.navigation.next}
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="theme-btn"
                      onClick={handleSubmit}
                    >
                      <i className="fas fa-check me-2"></i>
                      {data.navigation.submit}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWizard;