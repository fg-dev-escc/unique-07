import { useState } from 'react';
import { useSelector } from 'react-redux';

import carTabsData from './carTabsData.json';

export const useCarTabsSection = () => {
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  const [activeTab, setActiveTab] = useState('description');

  const carTabsHelpers = {
    getFieldValue: (car, fieldKey) => {
      if (!car) return carTabsData.defaults.fieldValue;
      
      switch (fieldKey) {
        case 'vin':
          return car.vin || car.numeroSerie;
        case 'license':
          return car.placas;
        case 'registrationDate':
          return car.fechaRegistro ? carTabsHelpers.formatDate(car.fechaRegistro) : null;
        case 'lastService':
          return car.ultimoServicio ? carTabsHelpers.formatDate(car.ultimoServicio) : null;
        case 'warranty':
          return car.garantia;
        case 'accidents':
          return car.accidentes || carTabsData.defaults.accidents;
        case 'owners':
          return car.propietarios || carTabsData.defaults.owners;
        case 'location':
          return car.ubicacion;
        case 'inspection':
          return car.inspeccion ? carTabsData.labels.passed : carTabsData.labels.notInspected;
        default:
          return car[fieldKey] || carTabsData.defaults.fieldValue;
      }
    },

    formatDate: (date) => {
      if (!date) return carTabsData.defaults.date;
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    isYouTubeVideo: (url) => {
      return url && (url.includes('youtube.com') || url.includes('youtu.be'));
    },

    getYouTubeEmbedUrl: (url) => {
      if (!url) return '';
      
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    },

    getDocumentIcon: (docType) => {
      const icons = {
        'pdf': 'far fa-file-pdf',
        'doc': 'far fa-file-word',
        'docx': 'far fa-file-word',
        'xls': 'far fa-file-excel',
        'xlsx': 'far fa-file-excel',
        'jpg': 'far fa-file-image',
        'jpeg': 'far fa-file-image',
        'png': 'far fa-file-image',
        'gif': 'far fa-file-image',
        'default': 'far fa-file'
      };
      
      return icons[docType?.toLowerCase()] || icons.default;
    },

    getDocumentSize: (size) => {
      if (!size) return '';
      
      const bytes = Number(size);
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    calculateAverageRating: (reviews) => {
      if (!reviews || reviews.length === 0) return 0;
      
      const total = reviews.reduce((sum, review) => sum + (review.calificacion || 0), 0);
      return (total / reviews.length).toFixed(1);
    },

    getRatingDistribution: (reviews) => {
      if (!reviews || reviews.length === 0) return [0, 0, 0, 0, 0];
      
      const distribution = [0, 0, 0, 0, 0];
      reviews.forEach(review => {
        const rating = review.calificacion || 0;
        if (rating >= 1 && rating <= 5) {
          distribution[rating - 1]++;
        }
      });
      
      return distribution;
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return {
    carTabsHelpers,
    carTabsData,
    activeTab,
    carDetails,
    handleTabChange,
    loading,
    error
  };
};