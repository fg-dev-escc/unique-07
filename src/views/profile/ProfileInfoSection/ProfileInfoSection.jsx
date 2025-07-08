import React from 'react';

import { useProfileInfoSection } from './useProfileInfoSection';

const ProfileInfoSection = () => {
  const { 
    profileInfoHelpers, 
    profileInfoData, 
    user, 
    loading, 
    error 
  } = useProfileInfoSection();

  if (loading) return <div className="text-center py-4">{profileInfoData.messages.loading}</div>;
  if (error) return <div className="text-center py-4 text-danger">{error}</div>;

  return (
    <div className="profile-info-section">
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <div className="user-profile-avatar">
            <img 
              src={profileInfoHelpers.getUserAvatar(user)} 
              alt={profileInfoHelpers.getUserName(user)} 
            />
          </div>
          <div className="user-profile-info">
            <h4>{profileInfoHelpers.getUserName(user)}</h4>
            <p className="user-email">{profileInfoHelpers.getUserEmail(user)}</p>
            <span className="user-status">{profileInfoHelpers.getUserStatus(user)}</span>
          </div>
        </div>
        
        <div className="user-profile-card-body">
          <div className="row">
            {profileInfoData.fields.map((field, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="profile-info-item">
                  <span className="profile-info-label">{field.label}:</span>
                  <span className="profile-info-value">
                    {profileInfoHelpers.getFieldValue(user, field.key)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="user-profile-card-footer">
          <div className="profile-stats">
            {profileInfoData.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{profileInfoHelpers.getStatValue(user, stat.key)}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;