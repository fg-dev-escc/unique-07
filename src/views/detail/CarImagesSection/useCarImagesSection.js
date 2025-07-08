import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import carImagesData from './carImagesData.json';

export const useCarImagesSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const carImagesHelpers = {
    extractImages: (car) => {
      if (!car) return [];
      
      const images = [];
      
      // Main image
      if (car.urlImgPrincipal) {
        images.push({
          url: car.urlImgPrincipal,
          type: 'main',
          alt: 'Imagen principal'
        });
      }
      
      // Additional images
      if (car.imagenes && Array.isArray(car.imagenes)) {
        car.imagenes.forEach((img, index) => {
          images.push({
            url: img.url || img,
            type: 'gallery',
            alt: `Imagen ${index + 1}`
          });
        });
      }
      
      // Fallback image if no images
      if (images.length === 0) {
        images.push({
          url: carImagesData.defaults.image,
          type: 'default',
          alt: 'Imagen no disponible'
        });
      }
      
      return images;
    },

    getCurrentImage: (images, index) => {
      if (!images || images.length === 0) return carImagesData.defaults.image;
      return images[index]?.url || carImagesData.defaults.image;
    },

    getThumbnailImage: (image) => {
      // In a real app, you might have thumbnail URLs
      return image?.url || carImagesData.defaults.image;
    },

    getImageAlt: (car, index) => {
      if (!car) return carImagesData.defaults.alt;
      const carName = car.nombre || car.title || 'Vehículo';
      return `${carName} - Imagen ${index + 1}`;
    },

    isAuctionActive: (car) => {
      if (!car) return false;
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        return end > new Date();
      }
      return car.activo || false;
    },

    getAuctionEndDate: (car) => {
      return car?.fechaFin || car?.fechaVencimiento;
    },

    getAuctionStatus: (car) => {
      if (!car) return 'inactive';
      
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        if (end <= new Date()) return 'ended';
        return 'active';
      }
      
      return car.activo ? 'active' : 'inactive';
    },

    preloadImage: (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    }
  };

  useEffect(() => {
    if (id) {
      // dispatch(fetchCarDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (carDetails) {
      const carImages = carImagesHelpers.extractImages(carDetails);
      setImages(carImages);
    }
  }, [carDetails]);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => Math.min(images.length - 1, prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!showModal) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          handleCloseModal();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showModal, currentImageIndex, images.length]);

  return {
    carImagesHelpers,
    carImagesData,
    images,
    currentImageIndex,
    showModal,
    carDetails,
    handleImageClick,
    handleThumbnailClick,
    handleCloseModal,
    handlePrevImage,
    handleNextImage,
    loading,
    error
  };
};