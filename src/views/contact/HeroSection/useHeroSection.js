import heroData from './heroData.json';

export const useHeroSection = () => {
  
  // helpers
  const heroHelpers = {
    getBackgroundStyle: (image) => ({
      background: `url(${image})`
    }),
    
    getBreadcrumbItemClass: (item) => {
      return item.active ? 'active' : '';
    },
    
    renderBreadcrumbItem: (item) => {
      return item.active ? item.label : { href: item.path, label: item.label };
    }
  };

  return {
    heroHelpers,
    heroData
  };
};