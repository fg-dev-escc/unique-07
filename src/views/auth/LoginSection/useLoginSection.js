import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLogin } from '../../../redux/features/auth/thunks';
import { consLogged } from '../../../const/consLogged';
import loginSectionData from './loginSectionData.json';

export const useLoginSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginErr, loadingLogin, logged } = useSelector(state => state.userReducer);

  const loginSectionHelpers = {
    validateEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    validatePassword: (password) => {
      return password.length >= 6;
    },

    validateForm: (formData) => {
      const newErrors = {};
      
      if (!formData.email) {
        newErrors.email = loginSectionData.validation.emailRequired;
      } else if (!loginSectionHelpers.validateEmail(formData.email)) {
        newErrors.email = loginSectionData.validation.emailInvalid;
      }
      
      if (!formData.password) {
        newErrors.password = loginSectionData.validation.passwordRequired;
      } else if (!loginSectionHelpers.validatePassword(formData.password)) {
        newErrors.password = loginSectionData.validation.passwordMinLength;
      }
      
      return newErrors;
    },

    clearError: (errors, fieldName) => {
      if (errors[fieldName]) {
        const newErrors = { ...errors };
        delete newErrors[fieldName];
        return newErrors;
      }
      return errors;
    },

    isFormValid: (formData) => {
      const errors = loginSectionHelpers.validateForm(formData);
      return Object.keys(errors).length === 0;
    },

    getLoginButtonText: (loading) => {
      return loading ? loginSectionData.buttons.signingIn : loginSectionData.buttons.signIn;
    },

    getLoginButtonIcon: (loading) => {
      return loading ? loginSectionData.icons.loading : loginSectionData.icons.signIn;
    },

    getSocialLoginUrl: (provider) => {
      return loginSectionData.socialLogin.urls[provider] || '#';
    },

    formatLoginError: (error) => {
      return error || loginSectionData.messages.defaultError;
    }
  };

  useEffect(() => {
    if (logged === consLogged.LOGGED) {
      navigate('/');
    }
  }, [logged, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => loginSectionHelpers.clearError(prev, name));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = loginSectionHelpers.validateForm(formData);
    
    if (Object.keys(newErrors).length === 0) {
      dispatch(startLogin(formData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSocialLogin = (provider) => {
    const url = loginSectionHelpers.getSocialLoginUrl(provider);
    if (url !== '#') {
      window.location.href = url;
    } else {
      console.log(`Login with ${provider} - Not implemented yet`);
    }
  };

  return {
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
  };
};