import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import ProfileLayout from '../ProfileLayout';

const Billing = () => {
  const { user } = useSelector(state => state.userReducer);

  const [billingData, setBillingData] = useState({
    firstName: user?.nombre?.split(' ')[0] || '',
    lastName: user?.nombre?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.telefono || '',
    address: user?.direccion || '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!billingData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!billingData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!billingData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(billingData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!billingData.address) {
      newErrors.address = 'Address is required';
    }
    
    if (!billingData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!billingData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!billingData.zip) {
      newErrors.zip = 'Zip code is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsUpdating(true);
      try {
        // TODO: Dispatch save billing info action
        console.log('Save billing info:', billingData);
        
        // Simulate API call
        setTimeout(() => {
          setIsUpdating(false);
          alert('Billing information saved successfully!');
        }, 2000);
      } catch (error) {
        setIsUpdating(false);
        console.error('Error saving billing info:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <ProfileLayout title="Billing Info">
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Billing Information</h4>
        </div>
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={billingData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  disabled={isUpdating}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={billingData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  disabled={isUpdating}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={billingData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled={isUpdating}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={billingData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  disabled={isUpdating}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={billingData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  disabled={isUpdating}
                />
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  name="address2"
                  value={billingData.address2}
                  onChange={handleInputChange}
                  placeholder="Address 2"
                  disabled={isUpdating}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={billingData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  disabled={isUpdating}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={billingData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  disabled={isUpdating}
                />
                {errors.state && (
                  <small className="text-danger">{errors.state}</small>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Zip</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  value={billingData.zip}
                  onChange={handleInputChange}
                  placeholder="Zip"
                  disabled={isUpdating}
                />
                {errors.zip && (
                  <small className="text-danger">{errors.zip}</small>
                )}
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <i className="far fa-spinner fa-spin"></i> Saving...
              </>
            ) : (
              <>
                Save Billing Info <i className="far fa-save"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default Billing;