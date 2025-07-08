import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import carInfoData from './carInfoData.json';

export const useCarInfoSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);

  const carInfoHelpers = {
    getCarTitle: (car) => {
      return car?.nombre || car?.title || carInfoData.defaults.title;
    },

    formatPrice: (price) => {
      if (!price) return carInfoData.defaults.price;
      return `$${Number(price).toLocaleString('en-US')}`;
    },

    getFieldValue: (car, fieldKey) => {
      if (!car) return carInfoData.defaults.fieldValue;
      
      switch (fieldKey) {
        case 'brand':
          return car.marca || carInfoData.defaults.brand;
        case 'model':
          return car.modelo || carInfoData.defaults.model;
        case 'year':
          return car.anio || car.modeloAnio || carInfoData.defaults.year;
        case 'mileage':
          return car.kilometraje ? `${Number(car.kilometraje).toLocaleString('en-US')} km` : carInfoData.defaults.mileage;
        case 'fuel':
          return car.tipoCombustible || carInfoData.defaults.fuel;
        case 'transmission':
          return car.transmision || carInfoData.defaults.transmission;
        case 'engine':
          return car.motor || carInfoData.defaults.engine;
        case 'color':
          return car.color || carInfoData.defaults.color;
        case 'condition':
          return car.condicion || carInfoData.defaults.condition;
        case 'doors':
          return car.puertas || carInfoData.defaults.doors;
        case 'seats':
          return car.asientos || carInfoData.defaults.seats;
        case 'vin':
          return car.vin || car.numeroSerie;
        case 'license':
          return car.placas;
        default:
          return car[fieldKey] || carInfoData.defaults.fieldValue;
      }
    },

    formatFeatures: (features) => {
      if (!features) return [];
      if (Array.isArray(features)) return features;
      if (typeof features === 'string') {
        return features.split(',').map(f => f.trim());
      }
      return [];
    },

    getSellerInfo: (car) => {
      return car?.seller || car?.vendedor || {};
    },

    formatRating: (rating) => {
      if (!rating) return carInfoData.defaults.rating;
      return Number(rating).toFixed(1);
    },

    getShareData: (car) => {
      return {
        title: carInfoHelpers.getCarTitle(car),
        text: `Mira este ${car?.marca || ''} ${car?.modelo || ''} en subasta`,
        url: window.location.href
      };
    },

    canShare: () => {
      return navigator.share !== undefined;
    },

    fallbackShare: (shareData) => {
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url)
          .then(() => {
            alert(carInfoData.messages.linkCopied);
          })
          .catch(() => {
            // Fallback to manual copy
            carInfoHelpers.manualCopy(shareData.url);
          });
      } else {
        carInfoHelpers.manualCopy(shareData.url);
      }
    },

    manualCopy: (text) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert(carInfoData.messages.linkCopied);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = async (car) => {
    const shareData = carInfoHelpers.getShareData(car);
    
    if (carInfoHelpers.canShare()) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        carInfoHelpers.fallbackShare(shareData);
      }
    } else {
      carInfoHelpers.fallbackShare(shareData);
    }
  };

  const handleFavorite = (carId) => {
    if (!carId) return;
    
    // dispatch(toggleFavorite(carId));
    console.log('Toggle favorite for car:', carId);
  };

  const handleContact = (seller) => {
    if (!seller) return;
    
    // Open contact modal or redirect to contact form
    console.log('Contact seller:', seller);
  };

  return {
    carInfoHelpers,
    carInfoData,
    carDetails,
    handleShare,
    handleFavorite,
    handleContact,
    loading,
    error
  };
};