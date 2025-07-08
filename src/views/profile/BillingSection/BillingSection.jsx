import React from 'react';

import { useBillingSection } from './useBillingSection';

const BillingSection = () => {
  const {
    billingHelpers,
    billingData,
    billingForm,
    paymentMethods,
    isEditing,
    handleBillingSubmit,
    handleEditToggle,
    handleBillingChange,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    loading,
    error
  } = useBillingSection();

  return (
    <div className="billing-section">
      {/* Billing Information */}
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h5>{billingData.titles.billingInfo}</h5>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleEditToggle}
          >
            {isEditing ? billingData.buttons.cancel : billingData.buttons.edit}
          </button>
        </div>
        
        <div className="user-profile-card-body">
          <form onSubmit={handleBillingSubmit}>
            <div className="row">
              {billingData.billingFields.map((field, index) => (
                <div key={index} className={`col-md-${field.colSize || 6} mb-3`}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="form-select"
                      name={field.name}
                      value={billingForm[field.name] || ''}
                      onChange={handleBillingChange}
                      disabled={!isEditing}
                      required={field.required}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={billingForm[field.name] || ''}
                      onChange={handleBillingChange}
                      placeholder={field.placeholder}
                      disabled={!isEditing}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? billingData.buttons.saving : billingData.buttons.save}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="user-profile-card mt-4">
        <div className="user-profile-card-header">
          <h5>{billingData.titles.paymentMethods}</h5>
          <button 
            className="btn btn-success btn-sm"
            onClick={handleAddPaymentMethod}
          >
            {billingData.buttons.addPayment}
          </button>
        </div>
        
        <div className="user-profile-card-body">
          {paymentMethods.length > 0 ? (
            <div className="payment-methods-list">
              {paymentMethods.map((method, index) => (
                <div key={index} className="payment-method-item">
                  <div className="payment-method-info">
                    <div className="payment-method-type">
                      <i className={billingHelpers.getPaymentIcon(method.type)}></i>
                      <span>{billingHelpers.getPaymentLabel(method.type)}</span>
                    </div>
                    <div className="payment-method-details">
                      <span className="card-number">
                        **** **** **** {method.lastFour}
                      </span>
                      <span className="expiry-date">
                        {billingHelpers.formatExpiryDate(method.expiryMonth, method.expiryYear)}
                      </span>
                    </div>
                  </div>
                  <div className="payment-method-actions">
                    {method.isDefault && (
                      <span className="badge bg-primary">{billingData.labels.default}</span>
                    )}
                    <button 
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                    >
                      {billingData.buttons.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">{billingData.messages.noPaymentMethods}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default BillingSection;