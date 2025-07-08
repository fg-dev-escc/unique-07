import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import favoritesData from './favoritesData.json';

export const useFavoritesSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userReducer);
  
  const [allFavorites, setAllFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Load user favorites
    if (user?.id) {
      // dispatch(fetchUserFavorites(user.id));
      
      // Mock data for now
      setAllFavorites([
        {
          id: 1,
          title: 'Toyota Camry 2020',
          model: 'Camry',
          year: 2020,
          price: 25000,
          status: 'active',
          rating: 4.5,
          fuel: 'Gasolina',
          mileage: 45000,
          addedAt: '2024-01-15',
          image: '/assets/img/car/01.jpg'
        },
        {
          id: 2,
          title: 'Honda Civic 2019',
          model: 'Civic',
          year: 2019,
          price: 22000,
          status: 'sold',
          rating: 4.2,
          fuel: 'Híbrido',
          mileage: 35000,
          addedAt: '2024-01-10',
          image: '/assets/img/car/02.jpg'
        },
        {
          id: 3,
          title: 'Ford F-150 2021',
          model: 'F-150',
          year: 2021,
          price: 35000,
          status: 'active',
          rating: 4.8,
          fuel: 'Gasolina',
          mileage: 25000,
          addedAt: '2024-01-05',
          image: '/assets/img/car/03.jpg'
        }
      ]);
    }
  }, [user, dispatch]);

  const favorites = useMemo(() => {
    let filtered = allFavorites;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(favorite =>
        favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        favorite.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort favorites
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [allFavorites, searchQuery, sortBy]);

  const favoritesHelpers = {
    getCarImage: (car) => {
      return car.image || favoritesData.defaults.image;
    },

    getStatusBadgeClass: (status) => {
      const classes = {
        'active': 'bg-success',
        'inactive': 'bg-secondary',
        'sold': 'bg-primary',
        'expired': 'bg-danger'
      };
      return classes[status] || 'bg-secondary';
    },

    getStatusLabel: (status) => {
      const labels = {
        'active': 'Disponible',
        'inactive': 'No disponible',
        'sold': 'Vendido',
        'expired': 'Expirado'
      };
      return labels[status] || 'Desconocido';
    },

    formatPrice: (price) => {
      return price ? `$${Number(price).toLocaleString('en-US')}` : favoritesData.defaults.price;
    },

    formatMileage: (mileage) => {
      if (!mileage) return favoritesData.defaults.mileage;
      return `${Number(mileage).toLocaleString('en-US')} km`;
    },

    formatDate: (date) => {
      if (!date) return favoritesData.defaults.date;
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    getFavoritesStats: (favorites) => {
      const stats = {
        total: favorites.length,
        active: favorites.filter(f => f.status === 'active').length,
        sold: favorites.filter(f => f.status === 'sold').length,
        avgPrice: favorites.length > 0 
          ? favorites.reduce((sum, f) => sum + f.price, 0) / favorites.length 
          : 0,
        avgRating: favorites.length > 0 
          ? favorites.reduce((sum, f) => sum + (f.rating || 0), 0) / favorites.length 
          : 0
      };
      return stats;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleRemoveFavorite = (favoriteId) => {
    if (window.confirm(favoritesData.messages.confirmRemove)) {
      setAllFavorites(prev => prev.filter(favorite => favorite.id !== favoriteId));
      // dispatch(removeFavorite(favoriteId));
    }
  };

  const handleViewDetails = (favoriteId) => {
    // Navigate to car details page
    window.location.href = `/car/${favoriteId}`;
  };

  return {
    favoritesHelpers,
    favoritesData,
    favorites,
    searchQuery,
    sortBy,
    handleSearch,
    handleSort,
    handleRemoveFavorite,
    handleViewDetails,
    loading,
    error
  };
};