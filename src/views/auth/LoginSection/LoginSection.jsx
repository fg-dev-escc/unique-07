import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../components/ui/Breadcrumb';
import { useLoginSection } from './useLoginSection';

const LoginSection = () => {
  const {
    loginSectionHelpers,
    loginSectionData,
    formData,
    errors,
    rememberMe,
    loginErr,
    loadingLogin,
    logged,
    handleInputChange,
    handleSubmit,
    handleRememberMeChange,
    handleSocialLogin
  } = useLoginSection();

  return (
    <>
      <Breadcrumb 
        title={loginSectionData.breadcrumb.title}
        currentPage={loginSectionData.breadcrumb.currentPage}
      />
      
      <div className="login-area py-120">
        <div className="container">
          <div className="col-md-5 mx-auto">
            <div className="login-form">
              <div className="login-header">
                <img src={loginSectionData.logo.src} alt={loginSectionData.logo.alt} />
                <p>{loginSectionData.subtitle}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{loginSectionData.form.fields.email.label}</label>
                  <input
                    type={loginSectionData.form.fields.email.type}
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={loginSectionData.form.fields.email.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                
                <div className="form-group">
                  <label>{loginSectionData.form.fields.password.label}</label>
                  <input
                    type={loginSectionData.form.fields.password.type}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={loginSectionData.form.fields.password.placeholder}
                    disabled={loadingLogin}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                
                {loginErr && (
                  <div className="alert alert-danger mb-3">
                    <i className="far fa-exclamation-triangle me-2"></i>
                    {loginSectionHelpers.formatLoginError(loginErr)}
                  </div>
                )}
                
                <div className="d-flex justify-content-between mb-4">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      id="remember"
                      disabled={loadingLogin}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      {loginSectionData.form.fields.rememberMe.label}
                    </label>
                  </div>
                  <Link to={loginSectionData.links.forgotPassword} className="forgot-pass">
                    {loginSectionData.buttons.forgotPassword}
                  </Link>
                </div>
                
                <div className="d-flex align-items-center">
                  <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={loadingLogin}
                  >
                    <i className={loginSectionHelpers.getLoginButtonIcon(loadingLogin)}></i> 
                    {loginSectionHelpers.getLoginButtonText(loadingLogin)}
                  </button>
                </div>
              </form>
              
              <div className="login-footer">
                <p>
                  {loginSectionData.footer.noAccount} 
                  <Link to={loginSectionData.links.register}>
                    {loginSectionData.footer.createAccount}
                  </Link>
                </p>
                <div className="social-login">
                  <p>{loginSectionData.socialLogin.title}</p>
                  <div className="social-login-list">
                    {loginSectionData.socialLogin.providers.map((provider, index) => (
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

export default LoginSection;