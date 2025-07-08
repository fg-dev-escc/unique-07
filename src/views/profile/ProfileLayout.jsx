import React from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileSidebar from './ProfileSidebar';

const ProfileLayout = ({ children, title = "My Profile" }) => {
  const { user } = useSelector(state => state.userReducer);

  return (
    <>
      <Breadcrumb 
        title={title}
        items={[
          { label: 'Home', path: '/' },
          { label: 'Profile', path: '/profile', active: true }
        ]}
      />
      
      <div className="user-profile py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ProfileSidebar user={user} />
            </div>
            <div className="col-lg-9">
              <div className="user-profile-wrapper">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;