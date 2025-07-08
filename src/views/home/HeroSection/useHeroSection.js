import heroData from './heroData.json';

export const useHeroSection = () => {
  
  // helpers
  const heroHelpers = {
    getSlideBackground: (slide) => {
      return `url(${slide.image})`;
    },

    getSlideStyle: (slide) => {
      return {
        background: `url(${slide.image})`,
        backgroundPosition: slide.backgroundPosition || 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      };
    },
    
    formatSlideTitle: (title) => {
      return { __html: title };
    },
    
    isValidSlideIndex: (index, totalSlides) => {
      return index >= 0 && index < totalSlides;
    }
  };

  return {
    heroHelpers,
    heroData
  };
};