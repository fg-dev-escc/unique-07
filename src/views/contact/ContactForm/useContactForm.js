import { useState } from 'react';
import contactFormData from './contactFormData.json';

export const useContactForm = () => {
  // state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage(contactFormData.messages.success);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage(contactFormData.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // helpers
  const formHelpers = {
    getMessageStyle: (message) => {
      return message.includes('Gracias') ? 'text-success' : 'text-danger';
    },
    
    isFormValid: () => {
      return formData.name && formData.email && formData.subject && formData.message;
    },
    
    resetForm: () => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitMessage('');
    }
  };

  return {
    formData,
    isSubmitting,
    submitMessage,
    handleInputChange,
    handleSubmit,
    formHelpers,
    contactFormData
  };
};