import React from 'react';

import { useHeroSection } from './useHeroSection';

const HeroSection = () => {
  const {
    heroSectionHelpers,
    heroSectionData,
    handleBreadcrumbNavigation
  } = useHeroSection();

  return (
    <div 
      className="site-breadcrumb" 
      style={{ background: heroSectionHelpers.formatBackgroundImage(heroSectionData.backgroundImage) }}
    >
      <div className="container">
        <h2 className="breadcrumb-title">{heroSectionData.title}</h2>
        <ul className="breadcrumb-menu" aria-label={heroSectionData.accessibility.breadcrumbAriaLabel}>
          {heroSectionData.breadcrumbItems.map((item, index) => (
            <li key={index} className={heroSectionHelpers.getBreadcrumbClass(item)}>
              {item.active ? (
                <span aria-current="page">{item.label}</span>
              ) : heroSectionHelpers.shouldUseAnchor(item) ? (
                <a href={item.path}>{item.label}</a>
              ) : (
                <button 
                  type="button"
                  onClick={() => handleBreadcrumbNavigation(item)}
                  className="breadcrumb-link"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;