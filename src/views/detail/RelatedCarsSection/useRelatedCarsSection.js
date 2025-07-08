import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import relatedCarsData from './relatedCarsData.json';

export const useRelatedCarsSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  
  const [relatedCars, setRelatedCars] = useState([]);

  const relatedCarsHelpers = {
    getCarImage: (car) => {
      return car?.urlImgPrincipal || relatedCarsData.defaults.image;
    },

    getCarTitle: (car) => {
      return car?.nombre || car?.title || `${car?.marca || ''} ${car?.modelo || ''}`.trim() || relatedCarsData.defaults.title;
    },

    formatPrice: (price) => {
      if (!price) return relatedCarsData.defaults.price;
      return `$${Number(price).toLocaleString('en-US')}`;
    },

    getFieldValue: (car, fieldKey) => {
      if (!car) return relatedCarsData.defaults.fieldValue;
      
      switch (fieldKey) {
        case 'year':
          return car.anio || car.modeloAnio || relatedCarsData.defaults.year;
        case 'mileage':
          return car.kilometraje ? `${Number(car.kilometraje).toLocaleString('en-US')} km` : relatedCarsData.defaults.mileage;
        case 'fuel':
          return car.tipoCombustible || relatedCarsData.defaults.fuel;
        case 'transmission':
          return car.transmision || relatedCarsData.defaults.transmission;
        default:
          return car[fieldKey] || relatedCarsData.defaults.fieldValue;
      }
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

    getStatusBadgeClass: (car) => {
      if (!car) return 'bg-secondary';
      
      if (relatedCarsHelpers.isAuctionActive(car)) {
        return 'bg-success';
      } else {
        return 'bg-secondary';
      }
    },

    getStatusLabel: (car) => {
      if (!car) return relatedCarsData.labels.inactive;
      
      if (relatedCarsHelpers.isAuctionActive(car)) {
        return relatedCarsData.labels.active;
      } else {
        return relatedCarsData.labels.inactive;
      }
    },

    getTimeLeft: (car) => {
      if (!car?.fechaFin) return null;
      
      const end = new Date(car.fechaFin);
      const now = new Date();
      let diff = end - now;
      
      if (diff <= 0) return relatedCarsData.labels.ended;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${minutes}m`;
      }
    },

    filterRelatedCars: (cars, currentCar) => {
      if (!cars || !currentCar) return [];
      
      let filtered = cars.filter(car => car.id !== currentCar.id);
      
      const sameBrand = filtered.filter(car => car.marca === currentCar.marca);
      const otherBrands = filtered.filter(car => car.marca !== currentCar.marca);
      
      const combined = [...sameBrand, ...otherBrands];
      return combined.slice(0, relatedCarsData.settings.maxItems);
    },

    calculateSimilarityScore: (car1, car2) => {
      if (!car1 || !car2) return 0;
      
      let score = 0;
      
      if (car1.marca === car2.marca) score += 3;
      
      const priceDiff = Math.abs(car1.precio - car2.precio) / car1.precio;
      if (priceDiff <= 0.2) score += 2;
      
      if (car1.anio === car2.anio) score += 1;
      
      if (car1.tipoCombustible === car2.tipoCombustible) score += 1;
      
      return score;
    }
  };

  useEffect(() => {
    if (carDetails) {
      fetchRelatedCars();
    }
  }, [carDetails]);

  const fetchRelatedCars = async () => {
    try {
      const mockRelatedCars = [
        {
          id: 'related1',
          nombre: 'Honda Accord 2021',
          marca: 'Honda',
          modelo: 'Accord',
          anio: 2021,
          precio: 28000,
          urlImgPrincipal: '/assets/img/car/01.jpg',
          activo: true,
          fechaFin: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          ubicacion: 'Ciudad de México',
          rating: 4.5,
          reviewCount: 12
        },
        {
          id: 'related2',
          nombre: 'Nissan Altima 2020',
          marca: 'Nissan',
          modelo: 'Altima',
          anio: 2020,
          precio: 24500,
          urlImgPrincipal: '/assets/img/car/02.jpg',
          activo: true,
          fechaFin: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          ubicacion: 'Guadalajara',
          rating: 4.2,
          reviewCount: 8
        },
        {
          id: 'related3',
          nombre: 'Mazda 6 2021',
          marca: 'Mazda',
          modelo: '6',
          anio: 2021,
          precio: 26800,
          urlImgPrincipal: '/assets/img/car/03.jpg',
          activo: true,
          fechaFin: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          ubicacion: 'Monterrey',
          rating: 4.7,
          reviewCount: 15
        }
      ];
      
      setRelatedCars(mockRelatedCars);
    } catch (error) {
      console.error('Error fetching related cars:', error);
    }
  };

  const handleCarClick = (carId) => {
    if (carId) {
      navigate(`/car/${carId}`);
    }
  };

  const handleFavoriteClick = (carId) => {
    if (!carId) return;
    
    console.log('Toggle favorite for car:', carId);
  };

  return {
    relatedCarsHelpers,
    relatedCarsData,
    relatedCars,
    handleCarClick,
    handleFavoriteClick,
    loading,
    error
  };
};