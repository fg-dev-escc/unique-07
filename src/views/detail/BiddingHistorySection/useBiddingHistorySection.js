import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import biddingHistoryData from './biddingHistoryData.json';

export const useBiddingHistorySection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  const biddingHistoryHelpers = {
    extractBiddingHistory: (car) => {
      if (!car) return [];
      
      let history = car.pujas || car.biddingHistory || [];
      
      history = history.sort((a, b) => {
        if (b.monto !== a.monto) {
          return b.monto - a.monto;
        }
        return new Date(b.fecha) - new Date(a.fecha);
      });
      
      return history;
    },

    formatPrice: (price) => {
      if (!price) return biddingHistoryData.defaults.price;
      return `$${Number(price).toLocaleString('en-US')}`;
    },

    formatDateTime: (date) => {
      if (!date) return biddingHistoryData.defaults.date;
      return new Date(date).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    getTimeAgo: (date) => {
      if (!date) return '';
      
      const now = new Date();
      const bidDate = new Date(date);
      const diffInMinutes = Math.floor((now - bidDate) / (1000 * 60));
      
      if (diffInMinutes < 1) return biddingHistoryData.timeLabels.justNow;
      if (diffInMinutes < 60) return `${diffInMinutes} ${biddingHistoryData.timeLabels.minutesAgo}`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} ${biddingHistoryData.timeLabels.hoursAgo}`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${biddingHistoryData.timeLabels.daysAgo}`;
    },

    getBidderName: (user) => {
      if (!user) return biddingHistoryData.defaults.bidderName;
      
      const name = user.nombre || user.name || user.username;
      if (!name) return biddingHistoryData.defaults.bidderName;
      
      return name.charAt(0).toUpperCase() + '*'.repeat(Math.max(2, name.length - 1));
    },

    getBidRowClass: (bid, index) => {
      let classes = '';
      
      if (index === 0) classes += ' winning-bid';
      if (bid.estado === 'active') classes += ' active-bid';
      if (bid.estado === 'outbid') classes += ' outbid';
      
      return classes.trim();
    },

    getStatusBadgeClass: (status) => {
      const classes = {
        'active': 'bg-success',
        'outbid': 'bg-secondary',
        'withdrawn': 'bg-warning',
        'invalid': 'bg-danger'
      };
      return classes[status] || 'bg-secondary';
    },

    getStatusLabel: (status) => {
      const labels = {
        'active': 'Activa',
        'outbid': 'Superada',
        'withdrawn': 'Retirada',
        'invalid': 'Inválida'
      };
      return labels[status] || 'Desconocida';
    },

    getUniqueBidders: (bids) => {
      if (!bids || bids.length === 0) return 0;
      
      const uniqueUserIds = new Set();
      bids.forEach(bid => {
        if (bid.usuario?.id || bid.userId) {
          uniqueUserIds.add(bid.usuario?.id || bid.userId);
        }
      });
      
      return uniqueUserIds.size;
    },

    getHighestBid: (bids) => {
      if (!bids || bids.length === 0) return 0;
      return Math.max(...bids.map(bid => bid.monto || 0));
    },

    getAverageBid: (bids) => {
      if (!bids || bids.length === 0) return 0;
      
      const total = bids.reduce((sum, bid) => sum + (bid.monto || 0), 0);
      return Math.round(total / bids.length);
    },

    getLowestBid: (bids) => {
      if (!bids || bids.length === 0) return 0;
      return Math.min(...bids.map(bid => bid.monto || 0));
    },

    getBidIncrement: (bids) => {
      if (!bids || bids.length < 2) return 0;
      
      const increments = [];
      for (let i = 1; i < bids.length; i++) {
        const increment = bids[i-1].monto - bids[i].monto;
        if (increment > 0) increments.push(increment);
      }
      
      if (increments.length === 0) return 0;
      return Math.round(increments.reduce((sum, inc) => sum + inc, 0) / increments.length);
    }
  };

  useEffect(() => {
    if (carDetails) {
      const history = biddingHistoryHelpers.extractBiddingHistory(carDetails);
      setBiddingHistory(history);
    }
  }, [carDetails]);

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleLoadMoreBids = () => {
    console.log('Load more bids');
  };

  return {
    biddingHistoryHelpers,
    biddingHistoryData,
    biddingHistory,
    showHistory,
    handleToggleHistory,
    handleLoadMoreBids,
    loading,
    error
  };
};