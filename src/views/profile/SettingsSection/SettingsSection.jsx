import React from 'react';

import { useSettingsSection } from './useSettingsSection';

const SettingsSection = () => {
  const {
    settingsHelpers,
    settingsData,
    profileForm,
    passwordForm,
    isEditing,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleEditToggle,
    handleProfileChange,
    handlePasswordChange,
    loading,
    error
  } = useSettingsSection();

  return (
    <div className="settings-section">
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h5>{settingsData.titles.profileSettings}</h5>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleEditToggle}
          >
            {isEditing ? settingsData.buttons.cancel : settingsData.buttons.edit}
          </button>
        </div>
        
        <div className="user-profile-card-body">
          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit}>
            <div className="row">
              {settingsData.profileFields.map((field, index) => (
                <div key={index} className={`col-md-${field.colSize || 6} mb-3`}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="form-select"
                      name={field.name}
                      value={profileForm[field.name] || ''}
                      onChange={handleProfileChange}
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
                  ) : field.type === 'textarea' ? (
                    <textarea
                      className="form-control"
                      name={field.name}
                      value={profileForm[field.name] || ''}
                      onChange={handleProfileChange}
                      placeholder={field.placeholder}
                      disabled={!isEditing}
                      required={field.required}
                      rows={field.rows || 3}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      value={profileForm[field.name] || ''}
                      onChange={handleProfileChange}
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
                  {loading ? settingsData.buttons.saving : settingsData.buttons.save}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="user-profile-card mt-4">
        <div className="user-profile-card-header">
          <h5>{settingsData.titles.passwordChange}</h5>
        </div>
        
        <div className="user-profile-card-body">
          <form onSubmit={handlePasswordSubmit}>
            <div className="row">
              {settingsData.passwordFields.map((field, index) => (
                <div key={index} className={`col-md-${field.colSize || 12} mb-3`}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    className="form-control"
                    name={field.name}
                    value={passwordForm[field.name] || ''}
                    onChange={handlePasswordChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? settingsData.buttons.updating : settingsData.buttons.updatePassword}
              </button>
            </div>
          </form>
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

export default SettingsSection;