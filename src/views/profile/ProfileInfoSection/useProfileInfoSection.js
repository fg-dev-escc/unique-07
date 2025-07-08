import { useSelector } from 'react-redux';

import profileInfoData from './profileInfoData.json';

export const useProfileInfoSection = () => {
  const { user, loading, error } = useSelector(state => state.userReducer);

  const profileInfoHelpers = {
    getUserAvatar: (user) => {
      return user?.avatar || user?.photo || profileInfoData.defaults.avatar;
    },

    getUserName: (user) => {
      return user?.displayName || user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || profileInfoData.defaults.name;
    },

    getUserEmail: (user) => {
      return user?.email || profileInfoData.defaults.email;
    },

    getUserStatus: (user) => {
      return user?.verified ? profileInfoData.status.verified : profileInfoData.status.unverified;
    },

    getFieldValue: (user, fieldKey) => {
      const value = user?.[fieldKey];
      if (!value) return profileInfoData.defaults.fieldValue;
      
      switch (fieldKey) {
        case 'phone':
          return value || profileInfoData.defaults.phone;
        case 'address':
          return value || profileInfoData.defaults.address;
        case 'city':
          return value || profileInfoData.defaults.city;
        case 'country':
          return value || profileInfoData.defaults.country;
        case 'joinDate':
          return value ? new Date(value).toLocaleDateString() : profileInfoData.defaults.joinDate;
        case 'lastLogin':
          return value ? new Date(value).toLocaleDateString() : profileInfoData.defaults.lastLogin;
        default:
          return value;
      }
    },

    getStatValue: (user, statKey) => {
      switch (statKey) {
        case 'listings':
          return user?.stats?.listings || 0;
        case 'favorites':
          return user?.stats?.favorites || 0;
        case 'transactions':
          return user?.stats?.transactions || 0;
        case 'rating':
          return user?.stats?.rating || '0.0';
        default:
          return '0';
      }
    },

    formatDate: (date) => {
      if (!date) return profileInfoData.defaults.fieldValue;
      return new Date(date).toLocaleDateString();
    },

    formatPhoneNumber: (phone) => {
      if (!phone) return profileInfoData.defaults.phone;
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
  };

  return {
    profileInfoHelpers,
    profileInfoData,
    user,
    loading,
    error
  };
};