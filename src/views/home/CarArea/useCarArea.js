import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startGetFeaturedCars, startSearchCars } from '../../../redux/features/home/thunks';
import { setSortBy, setSearchQuery } from '../../../redux/features/home/homeSlice';

import carAreaData from './carAreaData.json';

export const useCarArea = (scope = 'main') => {
  const dispatch = useDispatch();
  const carsState = useSelector(state => state.homeReducer.carsByScope?.[scope]);
  const { featuredCars = [], loading, error } = useMemo(() => carsState || {}, [carsState]);
  const {
    searchQuery,
    sortBy,
    pagination
  } = useSelector(state => state.homeReducer);
  
  // state
  const [, setTick] = useState(0);

  // effects
  useEffect(() => {
    dispatch(startGetFeaturedCars(1, 6, '1', scope));
  }, [dispatch, scope]);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // helpers
  const carAreaHelpers = {
    getCarImage: (car) => {
      if (car.urlImgPrincipal) return car.urlImgPrincipal;
      return carAreaData.defaults.image;
    },

    getTimeLeft: (fechaFin) => {
      if (!fechaFin) return '';
      const end = new Date(fechaFin);
      const now = new Date();
      let diff = end - now;
      if (diff <= 0) return 'Subasta terminada';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);
      
      const pad = (n) => n.toString().padStart(2, '0');
      return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    },

    getAuctionEndDate: (car) => {
      // compatibility
      return car.fechaFin || car.fechaVencimiento;
    },

    isAuctionActive: (car) => {
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        return end > new Date();
      }
      if (car.activo !== undefined) return car.activo;
      return false;
    },

    getStatus: (car) => {
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        if (end <= new Date()) return 'Inactivo';
        return 'Activo';
      }
      if (car.activo !== undefined) return car.activo ? 'Activo' : 'Inactivo';
      return 'Inactivo';
    },

    formatPrice: (price) => {
      return price ? `$${Number(price).toLocaleString('en-US')}` : carAreaData.defaults.price;
    },

    getCarName: (car) => {
      return car.nombre || car.name || 'Vehicle';
    },

    getCarModel: (car) => {
      return car.modelo || car.modeloAnio || 'N/A';
    },

    getCarCapacity: (car) => {
      return car.capacidad || carAreaData.defaults.capacity;
    },

    getCarFuel: (car) => {
      return car.tipoCombustible || carAreaData.defaults.fuel;
    },

    getCarEfficiency: (car) => {
      return car.rendimiento || carAreaData.defaults.efficiency;
    },

    getCarTransmission: (car) => {
      return car.transmision || carAreaData.defaults.transmission;
    },

    getCarLink: (car) => {
      return `/subasta/${car.torreID || car.id}`;
    }
  };

  // handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(startSearchCars(searchQuery, 1, 6, sortBy, scope));
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, 1, 6, newSortBy, scope));
    } else {
      dispatch(startGetFeaturedCars(1, 6, newSortBy, scope));
    }
  };

  const handleLoadMore = () => {
    const nextPage = pagination.currentPage + 1;
    if (searchQuery) {
      dispatch(startSearchCars(searchQuery, nextPage, 6, sortBy, scope));
    } else {
      dispatch(startGetFeaturedCars(nextPage, 6, sortBy, scope));
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return {
    carAreaHelpers,
    carAreaData,
    handleSearchSubmit,
    handleSortChange,
    handleLoadMore,
    handleSearchChange,
    loading,
    error,
    featuredCars,
    sortBy,
    searchQuery,
    pagination
  };
};