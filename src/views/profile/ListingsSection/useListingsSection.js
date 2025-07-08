import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import listingsData from './listingsData.json';

export const useListingsSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userReducer);
  
  const [allListings, setAllListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Load user listings
    if (user?.id) {
      // dispatch(fetchUserListings(user.id));
      
      // Mock data for now
      setAllListings([
        {
          id: 1,
          title: 'Toyota Camry 2020',
          model: 'Camry',
          price: 25000,
          status: 'active',
          createdAt: '2024-01-15',
          views: 156,
          bids: 8,
          image: '/assets/img/car/01.jpg'
        },
        {
          id: 2,
          title: 'Honda Civic 2019',
          model: 'Civic',
          price: 22000,
          status: 'inactive',
          createdAt: '2024-01-10',
          views: 89,
          bids: 3,
          image: '/assets/img/car/02.jpg'
        },
        {
          id: 3,
          title: 'Ford F-150 2021',
          model: 'F-150',
          price: 35000,
          status: 'sold',
          createdAt: '2024-01-05',
          views: 234,
          bids: 12,
          image: '/assets/img/car/03.jpg'
        }
      ]);
    }
  }, [user, dispatch]);

  const listings = useMemo(() => {
    let filtered = allListings;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(listing => listing.status === statusFilter);
    }

    return filtered;
  }, [allListings, searchQuery, statusFilter]);

  const listingsHelpers = {
    getListingImage: (listing) => {
      return listing.image || listingsData.defaults.image;
    },

    getStatusBadgeClass: (status) => {
      const classes = {
        'active': 'bg-success',
        'inactive': 'bg-secondary',
        'pending': 'bg-warning',
        'sold': 'bg-primary',
        'expired': 'bg-danger'
      };
      return classes[status] || 'bg-secondary';
    },

    getStatusLabel: (status) => {
      const labels = {
        'active': 'Activo',
        'inactive': 'Inactivo',
        'pending': 'Pendiente',
        'sold': 'Vendido',
        'expired': 'Expirado'
      };
      return labels[status] || 'Desconocido';
    },

    getToggleStatusIcon: (status) => {
      return status === 'active' ? 'fas fa-pause' : 'fas fa-play';
    },

    getToggleStatusLabel: (status) => {
      return status === 'active' ? 'Desactivar' : 'Activar';
    },

    formatPrice: (price) => {
      return price ? `$${Number(price).toLocaleString('en-US')}` : listingsData.defaults.price;
    },

    formatDate: (date) => {
      if (!date) return listingsData.defaults.date;
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    getListingStats: (listings) => {
      const stats = {
        total: listings.length,
        active: listings.filter(l => l.status === 'active').length,
        inactive: listings.filter(l => l.status === 'inactive').length,
        sold: listings.filter(l => l.status === 'sold').length,
        totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
        totalBids: listings.reduce((sum, l) => sum + (l.bids || 0), 0)
      };
      return stats;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleEditListing = (listingId) => {
    // Navigate to edit listing page
    console.log('Edit listing:', listingId);
    // window.location.href = `/sell/edit/${listingId}`;
  };

  const handleDeleteListing = (listingId) => {
    if (window.confirm(listingsData.messages.confirmDelete)) {
      setAllListings(prev => prev.filter(listing => listing.id !== listingId));
      // dispatch(deleteListing(listingId));
    }
  };

  const handleToggleStatus = (listingId) => {
    setAllListings(prev => 
      prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, status: listing.status === 'active' ? 'inactive' : 'active' }
          : listing
      )
    );
    // dispatch(toggleListingStatus(listingId));
  };

  return {
    listingsHelpers,
    listingsData,
    listings,
    searchQuery,
    statusFilter,
    handleSearch,
    handleStatusFilter,
    handleEditListing,
    handleDeleteListing,
    handleToggleStatus,
    loading,
    error
  };
};