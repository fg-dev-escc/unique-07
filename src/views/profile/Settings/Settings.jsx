import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import ProfileLayout from '../ProfileLayout';

const Settings = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // Profile Update Form State
  const [profileData, setProfileData] = useState({
    firstName: user?.nombre?.split(' ')[0] || '',
    lastName: user?.nombre?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.telefono || '',
    address: user?.direccion || ''
  });

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    
    if (!profileData.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!profileData.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!profileData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Email is invalid';
    }
    
    return errors;
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.oldPassword) {
      errors.oldPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const errors = validateProfileForm();
    
    if (Object.keys(errors).length === 0) {
      setIsUpdatingProfile(true);
      try {
        // TODO: Dispatch update profile action
        const updateData = {
          nombre: `${profileData.firstName} ${profileData.lastName}`,
          email: profileData.email,
          telefono: profileData.phone,
          direccion: profileData.address
        };
        console.log('Update profile:', updateData);
        
        // Simulate API call
        setTimeout(() => {
          setIsUpdatingProfile(false);
          alert('Profile updated successfully!');
        }, 2000);
      } catch (error) {
        setIsUpdatingProfile(false);
        console.error('Error updating profile:', error);
      }
    } else {
      setProfileErrors(errors);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePasswordForm();
    
    if (Object.keys(errors).length === 0) {
      setIsChangingPassword(true);
      try {
        // TODO: Dispatch change password action
        console.log('Change password:', {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        });
        
        // Simulate API call
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          alert('Password changed successfully!');
        }, 2000);
      } catch (error) {
        setIsChangingPassword(false);
        console.error('Error changing password:', error);
      }
    } else {
      setPasswordErrors(errors);
    }
  };

  return (
    <ProfileLayout title="Settings">
      {/* Update Profile Form */}
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Update Profile Info</h4>
        </div>
        <form className="user-profile-form" onSubmit={handleProfileSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  placeholder="First Name"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.firstName && (
                  <small className="text-danger">{profileErrors.firstName}</small>
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
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  placeholder="Last Name"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.lastName && (
                  <small className="text-danger">{profileErrors.lastName}</small>
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
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  disabled={isUpdatingProfile}
                />
                {profileErrors.email && (
                  <small className="text-danger">{profileErrors.email}</small>
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
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Phone"
                  disabled={isUpdatingProfile}
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
                  value={profileData.address}
                  onChange={handleProfileChange}
                  placeholder="Address"
                  disabled={isUpdatingProfile}
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <i className="far fa-spinner fa-spin"></i> Updating...
              </>
            ) : (
              <>
                Update Profile Info <i className="far fa-user"></i>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Change Password Form */}
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Change Password</h4>
        </div>
        <form className="user-profile-form" onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
              disabled={isChangingPassword}
            />
            {passwordErrors.oldPassword && (
              <small className="text-danger">{passwordErrors.oldPassword}</small>
            )}
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              disabled={isChangingPassword}
            />
            {passwordErrors.newPassword && (
              <small className="text-danger">{passwordErrors.newPassword}</small>
            )}
          </div>
          <div className="form-group">
            <label>Re-Type Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-Type Password"
              disabled={isChangingPassword}
            />
            {passwordErrors.confirmPassword && (
              <small className="text-danger">{passwordErrors.confirmPassword}</small>
            )}
          </div>
          <button 
            type="submit" 
            className="theme-btn mt-4"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <>
                <i className="far fa-spinner fa-spin"></i> Changing...
              </>
            ) : (
              <>
                Change Password <i className="far fa-key"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default Settings;