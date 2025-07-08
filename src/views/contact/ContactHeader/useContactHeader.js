import contactHeaderData from './contactHeaderData.json';

export const useContactHeader = () => {
  
  // helpers
  const contactHeaderHelpers = {
    getSectionStyle: () => ({
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f1f4ff 100%)'
    }),
    
    formatTitle: (title, titleSpan) => {
      return `${title} ${titleSpan}`;
    },
    
    validateContent: () => {
      const { sectionTitle } = contactHeaderData;
      return sectionTitle.title && sectionTitle.description;
    }
  };

  return {
    contactHeaderHelpers,
    contactHeaderData
  };
};