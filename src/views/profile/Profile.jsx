import React from 'react';

import ProfileInfoSection from './ProfileInfoSection/ProfileInfoSection';
import SettingsSection from './SettingsSection/SettingsSection';
import BillingSection from './BillingSection/BillingSection';
import ListingsSection from './ListingsSection/ListingsSection';
import FavoritesSection from './FavoritesSection/FavoritesSection';
import TransactionsSection from './TransactionsSection/TransactionsSection';

const Profile = () => {
  return (
    <>
      <ProfileInfoSection />
      <SettingsSection />
      <BillingSection />
      <ListingsSection />
      <FavoritesSection />
      <TransactionsSection />
    </>
  );
};

export default Profile;