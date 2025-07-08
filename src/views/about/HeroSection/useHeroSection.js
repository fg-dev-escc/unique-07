import { useNavigate } from 'react-router-dom';

import heroSectionData from './heroSectionData.json';

export const useHeroSection = () => {
  const navigate = useNavigate();

  const heroSectionHelpers = {
    handleBreadcrumbClick: (path) => {
      if (path && path !== '#') {
        navigate(path);
      }
    },

    getBreadcrumbClass: (item) => {
      return item.active ? 'active' : '';
    },

    formatBackgroundImage: (imagePath) => {
      if (!imagePath) return '';
      return `url(${imagePath})`;
    },

    isExternalLink: (path) => {
      return path && (path.startsWith('http') || path.startsWith('//'));
    },

    shouldUseAnchor: (item) => {
      return !item.active && (heroSectionHelpers.isExternalLink(item.path) || item.path.includes('.html'));
    },

    getLastBreadcrumbItem: (items) => {
      return items[items.length - 1];
    },

    getActiveBreadcrumbItem: (items) => {
      return items.find(item => item.active);
    },

    generateBreadcrumbSchema: (items) => {
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          "item": item.path && !item.active ? window.location.origin + item.path : undefined
        }))
      };
    }
  };

  const handleBreadcrumbNavigation = (item) => {
    if (!item.active) {
      if (heroSectionHelpers.isExternalLink(item.path) || item.path.includes('.html')) {
        window.location.href = item.path;
      } else {
        heroSectionHelpers.handleBreadcrumbClick(item.path);
      }
    }
  };

  return {
    heroSectionHelpers,
    heroSectionData,
    handleBreadcrumbNavigation
  };
};