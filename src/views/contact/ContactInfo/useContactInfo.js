import contactInfoData from './contactInfoData.json';

export const useContactInfo = () => {
  
  // helpers
  const contactInfoHelpers = {
    formatContactInfo: (info) => {
      return {
        ...info,
        isEmail: info.content.includes('@'),
        isPhone: info.content.includes('+'),
        isAddress: info.icon.includes('map')
      };
    },
    
    getContactLink: (info) => {
      if (info.content.includes('@')) {
        return `mailto:${info.content}`;
      }
      if (info.content.includes('+')) {
        return `tel:${info.content}`;
      }
      return null;
    },
    
    validateContactInfo: (info) => {
      return info.icon && info.title && info.content;
    }
  };

  return {
    contactInfoHelpers,
    contactInfoData
  };
};