import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import settingsData from './settingsData.json';

export const useSettingsSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userReducer);
  
  const [profileForm, setProfileForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const settingsHelpers = {
    validateProfileForm: (formData) => {
      const errors = {};
      
      if (!formData.firstName) errors.firstName = settingsData.validation.required;
      if (!formData.lastName) errors.lastName = settingsData.validation.required;
      if (!formData.email) errors.email = settingsData.validation.required;
      if (formData.email && !settingsHelpers.isValidEmail(formData.email)) {
        errors.email = settingsData.validation.invalidEmail;
      }
      if (formData.phone && !settingsHelpers.isValidPhone(formData.phone)) {
        errors.phone = settingsData.validation.invalidPhone;
      }
      
      return errors;
    },

    validatePasswordForm: (formData) => {
      const errors = {};
      
      if (!formData.currentPassword) errors.currentPassword = settingsData.validation.required;
      if (!formData.newPassword) errors.newPassword = settingsData.validation.required;
      if (!formData.confirmPassword) errors.confirmPassword = settingsData.validation.required;
      
      if (formData.newPassword && formData.newPassword.length < 8) {
        errors.newPassword = settingsData.validation.passwordLength;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = settingsData.validation.passwordMismatch;
      }
      
      return errors;
    },

    isValidEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    isValidPhone: (phone) => {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return phoneRegex.test(phone);
    },

    formatFormData: (formData) => {
      return {
        ...formData,
        phone: formData.phone ? formData.phone.replace(/\D/g, '') : '',
        email: formData.email ? formData.email.toLowerCase() : ''
      };
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    const errors = settingsHelpers.validateProfileForm(profileForm);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    try {
      const formattedData = settingsHelpers.formatFormData(profileForm);
      // dispatch(updateUserProfile(formattedData));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = settingsHelpers.validatePasswordForm(passwordForm);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    try {
      // dispatch(updateUserPassword(passwordForm));
      setPasswordForm({});
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form to original values
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        bio: user.bio || ''
      });
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
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
  };
};