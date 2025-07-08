import React from 'react';

import { useSelector } from 'react-redux';

import ProfileLayout from '../ProfileLayout';

const ProfileInfo = () => {
  const { user } = useSelector(state => state.userReducer);

  return (
    <ProfileLayout title="My Profile">
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Profile Information</h4>
        </div>
        <ul className="profile-info-list">
          <li>
            <div className="profile-info-label">Full Name:</div>
            <div className="profile-info-value">{user?.nombre || 'Not provided'}</div>
          </li>
          <li>
            <div className="profile-info-label">Email:</div>
            <div className="profile-info-value">{user?.email || 'Not provided'}</div>
          </li>
          <li>
            <div className="profile-info-label">Phone:</div>
            <div className="profile-info-value">{user?.telefono || 'Not provided'}</div>
          </li>
          <li>
            <div className="profile-info-label">Address:</div>
            <div className="profile-info-value">{user?.direccion || 'Not provided'}</div>
          </li>
          <li>
            <div className="profile-info-label">Join Date:</div>
            <div className="profile-info-value">
              {user?.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString() : 'Unknown'}
            </div>
          </li>
          <li>
            <div className="profile-info-label">User ID:</div>
            <div className="profile-info-value">{user?.usuarioID || 'N/A'}</div>
          </li>
        </ul>
      </div>
    </ProfileLayout>
  );
};

export default ProfileInfo;