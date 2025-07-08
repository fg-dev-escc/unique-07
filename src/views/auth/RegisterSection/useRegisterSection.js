import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startRegistro } from '../../../redux/features/auth/thunks';
import { consLogged } from '../../../const/consLogged';
import registerSectionData from './registerSectionData.json';

export const useRegisterSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingLogin, logged } = useSelector(state => state.userReducer);

  const registerSectionHelpers = {
    validateEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    validatePassword: (password) => {
      return password.length >= 6;
    },

    validateName: (name) => {
      return name.length >= 2;
    },

    validateForm: (formData, agreeTerms) => {
      const newErrors = {};
      
      if (!formData.nombre) {
        newErrors.nombre = registerSectionData.validation.nameRequired;
      } else if (!registerSectionHelpers.validateName(formData.nombre)) {
        newErrors.nombre = registerSectionData.validation.nameMinLength;
      }
      
      if (!formData.email) {
        newErrors.email = registerSectionData.validation.emailRequired;
      } else if (!registerSectionHelpers.validateEmail(formData.email)) {
        newErrors.email = registerSectionData.validation.emailInvalid;
      }
      
      if (!formData.password) {
        newErrors.password = registerSectionData.validation.passwordRequired;
      } else if (!registerSectionHelpers.validatePassword(formData.password)) {
        newErrors.password = registerSectionData.validation.passwordMinLength;
      }
      
      if (!agreeTerms) {
        newErrors.terms = registerSectionData.validation.termsRequired;
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

    isFormValid: (formData, agreeTerms) => {
      const errors = registerSectionHelpers.validateForm(formData, agreeTerms);
      return Object.keys(errors).length === 0;
    },

    getRegisterButtonText: (loading) => {
      return loading ? registerSectionData.buttons.registering : registerSectionData.buttons.register;
    },

    getRegisterButtonIcon: (loading) => {
      return loading ? registerSectionData.icons.loading : registerSectionData.icons.register;
    },

    getSocialLoginUrl: (provider) => {
      return registerSectionData.socialLogin.urls[provider] || '#';
    },

    formatRegisterError: (error) => {
      return error || registerSectionData.messages.defaultError;
    },

    formatTermsLabel: (label, termsLink) => {
      return label.replace('{termsLink}', termsLink);
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
      setErrors(prev => registerSectionHelpers.clearError(prev, name));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = registerSectionHelpers.validateForm(formData, agreeTerms);
    
    if (Object.keys(newErrors).length === 0) {
      dispatch(startRegistro(formData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleTermsChange = (e) => {
    setAgreeTerms(e.target.checked);
    if (errors.terms) {
      setErrors(prev => registerSectionHelpers.clearError(prev, 'terms'));
    }
  };

  const handleSocialLogin = (provider) => {
    const url = registerSectionHelpers.getSocialLoginUrl(provider);
    if (url !== '#') {
      window.location.href = url;
    } else {
      console.log(`Register with ${provider} - Not implemented yet`);
    }
  };

  return {
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
  };
};