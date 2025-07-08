import aboutSectionData from './aboutSectionData.json';

export const useAboutSection = () => {
  
  // helpers
  const aboutSectionHelpers = {
    formatExperienceText: (text) => ({
      __html: text
    }),
    
    getImageProps: (image) => ({
      src: image.main,
      alt: image.mainAlt,
      className: "about-img-1"
    }),
    
    getShapeProps: (image) => ({
      src: image.shape,
      alt: image.shapeAlt
    }),
    
    getExperienceIconProps: (experience) => ({
      src: experience.icon,
      alt: experience.iconAlt
    }),
    
    formatTitle: (title) => {
      if (!title.after) {
        return {
          before: title.before,
          highlight: title.highlight
        };
      }
      return title;
    },
    
    validateFeatures: (features) => {
      return Array.isArray(features) && features.length > 0;
    }
  };

  return {
    aboutSectionHelpers,
    aboutSectionData
  };
};