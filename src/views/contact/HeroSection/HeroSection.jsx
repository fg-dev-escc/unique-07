import React from 'react';

import { useHeroSection } from './useHeroSection';

const HeroSection = () => {
  const { heroHelpers, heroData } = useHeroSection();

  return (
    <div className="site-breadcrumb" style={heroHelpers.getBackgroundStyle(heroData.backgroundImage)}>
      <div className="container">
        <h2 className="breadcrumb-title">{heroData.title}</h2>
        <ul className="breadcrumb-menu">
          {heroData.breadcrumbItems.map((item, index) => (
            <li key={index} className={heroHelpers.getBreadcrumbItemClass(item)}>
              {heroHelpers.renderBreadcrumbItem(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;