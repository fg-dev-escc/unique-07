import contactMapData from './contactMapData.json';

export const useContactMap = () => {
  
  // helpers
  const contactMapHelpers = {
    getMapStyles: () => ({
      height: '400px',
      border: 0,
      width: '100%'
    }),
    
    validateMapUrl: (url) => {
      return url && url.includes('google.com/maps');
    },
    
    getMapProps: () => ({
      allowFullScreen: "",
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade"
    })
  };

  return {
    contactMapHelpers,
    contactMapData
  };
};