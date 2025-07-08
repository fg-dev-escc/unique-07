import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { startLogout } from '../../redux/features/auth/thunks';

const ProfileSidebar = ({ user }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      dispatch(startLogout());
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="user-profile-sidebar">
      <div className="user-profile-sidebar-top">
        <div className="user-profile-img">
          <img src="/assets/img/user/01.jpg" alt="" />
          <button type="button" className="profile-img-btn">
            <i className="far fa-camera"></i>
          </button>
          <input type="file" className="profile-img-file" />
        </div>
        <h4>{user?.nombre || 'Usuario'}</h4>
        <p>{user?.email || 'email@example.com'}</p>
      </div>
      <ul className="user-profile-sidebar-list">
        <li>
          <Link to="/profile" className={isActive('/profile')}>
            <i className="far fa-user"></i> My Profile
          </Link>
        </li>
        <li>
          <Link to="/profile/listings" className={isActive('/profile/listings')}>
            <i className="far fa-car"></i> My Car Listing
          </Link>
        </li>
        <li>
          <Link to="/profile/favorites" className={isActive('/profile/favorites')}>
            <i className="far fa-heart"></i> Favorites
          </Link>
        </li>
        <li>
          <Link to="/profile/transactions" className={isActive('/profile/transactions')}>
            <i className="far fa-repeat"></i> Transactions
          </Link>
        </li>
        <li>
          <Link to="/profile/billing" className={isActive('/profile/billing')}>
            <i className="far fa-draw-circle"></i> Billing Info
          </Link>
        </li>
        <li>
          <Link to="/profile/settings" className={isActive('/profile/settings')}>
            <i className="far fa-cog"></i> Settings
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout} className="profile-logout-btn">
            <i className="far fa-sign-out"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;