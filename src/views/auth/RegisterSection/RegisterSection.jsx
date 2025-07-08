import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useRegisterSection } from './useRegisterSection';

const RegisterSection = () => {
  const {
    registerSectionHelpers,
    registerSectionData,
    formData,
    errors,
    agreeTerms,
    loadingLogin,
    logged,
    handleInputChange,
    handleSubmit,
    handleTermsChange,
    handleSocialLogin
  } = useRegisterSection();

  return (
    <>
      <Breadcrumb 
        title={registerSectionData.breadcrumb.title}
        currentPage={registerSectionData.breadcrumb.currentPage}
      />
      
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src={registerSectionData.logo.src} alt={registerSectionData.logo.alt} />
                <p>{registerSectionData.subtitle}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{registerSectionData.form.fields.nombre.label}</label>
                  <input
                    type={registerSectionData.form.fields.nombre.type}
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder={registerSectionData.form.fields.nombre.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.nombre && (
                    <small className="text-danger">{errors.nombre}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>{registerSectionData.form.fields.email.label}</label>
                  <input
                    type={registerSectionData.form.fields.email.type}
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={registerSectionData.form.fields.email.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>{registerSectionData.form.fields.password.label}</label>
                  <input
                    type={registerSectionData.form.fields.password.type}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={registerSectionData.form.fields.password.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                
                <div className="form-check form-group">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={handleTermsChange}
                    id="agree"
                    disabled={loadingLogin}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Acepto los <Link to={registerSectionData.links.terms}>{registerSectionData.buttons.termsOfService}</Link>
                  </label>
                  {errors.terms && (
                    <small className="text-danger d-block">{errors.terms}</small>
                  )}
                </div>
                
                <div className="d-flex align-items-center">
                  <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={loadingLogin}
                  >
                    <i className={registerSectionHelpers.getRegisterButtonIcon(loadingLogin)}></i> 
                    {registerSectionHelpers.getRegisterButtonText(loadingLogin)}
                  </button>
                </div>
              </form>
              
              <div className="login-footer">
                <p>
                  {registerSectionData.footer.hasAccount} 
                  <Link to={registerSectionData.links.login}>
                    {registerSectionData.footer.loginHere}
                  </Link>
                </p>
                <div className="social-login">
                  <p>{registerSectionData.socialLogin.title}</p>
                  <div className="social-login-list">
                    {registerSectionData.socialLogin.providers.map((provider, index) => (
                      <a 
                        key={index}
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleSocialLogin(provider.name);
                        }}
                      >
                        <i className={provider.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSection;