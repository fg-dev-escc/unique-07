import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import billingData from './billingData.json';

export const useBillingSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userReducer);
  
  const [billingForm, setBillingForm] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.billing) {
      setBillingForm({
        firstName: user.billing.firstName || '',
        lastName: user.billing.lastName || '',
        company: user.billing.company || '',
        address: user.billing.address || '',
        city: user.billing.city || '',
        state: user.billing.state || '',
        zipCode: user.billing.zipCode || '',
        country: user.billing.country || '',
        taxId: user.billing.taxId || ''
      });
    }
    
    if (user?.paymentMethods) {
      setPaymentMethods(user.paymentMethods);
    }
  }, [user]);

  const billingHelpers = {
    validateBillingForm: (formData) => {
      const errors = {};
      
      if (!formData.firstName) errors.firstName = billingData.validation.required;
      if (!formData.lastName) errors.lastName = billingData.validation.required;
      if (!formData.address) errors.address = billingData.validation.required;
      if (!formData.city) errors.city = billingData.validation.required;
      if (!formData.country) errors.country = billingData.validation.required;
      if (!formData.zipCode) errors.zipCode = billingData.validation.required;
      
      if (formData.zipCode && !billingHelpers.isValidZipCode(formData.zipCode)) {
        errors.zipCode = billingData.validation.invalidZipCode;
      }
      
      return errors;
    },

    isValidZipCode: (zipCode) => {
      const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
      return zipRegex.test(zipCode);
    },

    formatBillingData: (formData) => {
      return {
        ...formData,
        zipCode: formData.zipCode ? formData.zipCode.replace(/\D/g, '') : '',
        taxId: formData.taxId ? formData.taxId.replace(/\D/g, '') : ''
      };
    },

    getPaymentIcon: (type) => {
      const icons = {
        'visa': 'fab fa-cc-visa',
        'mastercard': 'fab fa-cc-mastercard',
        'amex': 'fab fa-cc-amex',
        'discover': 'fab fa-cc-discover',
        'paypal': 'fab fa-cc-paypal',
        'default': 'fas fa-credit-card'
      };
      return icons[type] || icons.default;
    },

    getPaymentLabel: (type) => {
      const labels = {
        'visa': 'Visa',
        'mastercard': 'Mastercard',
        'amex': 'American Express',
        'discover': 'Discover',
        'paypal': 'PayPal',
        'default': 'Tarjeta de Crédito'
      };
      return labels[type] || labels.default;
    },

    formatExpiryDate: (month, year) => {
      if (!month || !year) return '';
      return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
    },

    maskCardNumber: (cardNumber) => {
      if (!cardNumber) return '';
      return cardNumber.replace(/\d(?=\d{4})/g, '*');
    }
  };

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    
    const errors = billingHelpers.validateBillingForm(billingForm);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    try {
      const formattedData = billingHelpers.formatBillingData(billingForm);
      // dispatch(updateBillingInfo(formattedData));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating billing info:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form to original values
      setBillingForm({
        firstName: user.billing?.firstName || '',
        lastName: user.billing?.lastName || '',
        company: user.billing?.company || '',
        address: user.billing?.address || '',
        city: user.billing?.city || '',
        state: user.billing?.state || '',
        zipCode: user.billing?.zipCode || '',
        country: user.billing?.country || '',
        taxId: user.billing?.taxId || ''
      });
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPaymentMethod = () => {
    // Open payment method modal or redirect to payment setup
    console.log('Add payment method');
  };

  const handleRemovePaymentMethod = (methodId) => {
    if (window.confirm(billingData.messages.confirmRemove)) {
      setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
      // dispatch(removePaymentMethod(methodId));
    }
  };

  return {
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
  };
};