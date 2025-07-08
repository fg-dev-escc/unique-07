import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import biddingInterfaceData from './biddingInterfaceData.json';

export const useBiddingInterfaceSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  const { user } = useSelector(state => state.userReducer);
  
  const [bidForm, setBidForm] = useState({ amount: '' });
  const [timeLeft, setTimeLeft] = useState('');

  const biddingInterfaceHelpers = {
    getAuctionStatus: (car) => {
      if (!car) return 'inactive';
      
      if (car.fechaFin) {
        const end = new Date(car.fechaFin);
        if (end <= new Date()) return 'ended';
        return 'active';
      }
      
      return car.activo ? 'active' : 'inactive';
    },

    calculateNextMinBid: (currentBid) => {
      const bid = Number(currentBid) || 0;
      const increment = biddingInterfaceHelpers.getBidIncrement(bid);
      return bid + increment;
    },

    getBidIncrement: (currentBid) => {
      if (currentBid < 1000) return 50;
      if (currentBid < 5000) return 100;
      if (currentBid < 10000) return 250;
      if (currentBid < 25000) return 500;
      if (currentBid < 50000) return 1000;
      return 2500;
    },

    calculateTimeLeft: (endDate) => {
      if (!endDate) return '';
      
      const end = new Date(endDate);
      const now = new Date();
      let diff = end - now;
      
      if (diff <= 0) return biddingInterfaceData.messages.auctionEnded;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);
      
      const pad = (n) => n.toString().padStart(2, '0');
      
      if (days > 0) {
        return `${days}d ${pad(hours)}h ${pad(minutes)}m`;
      } else if (hours > 0) {
        return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
      } else {
        return `${pad(minutes)}m ${pad(seconds)}s`;
      }
    },

    formatPrice: (price) => {
      if (!price) return '$0';
      return `$${Number(price).toLocaleString('en-US')}`;
    },

    isValidBid: (bidAmount, minBid) => {
      const amount = Number(bidAmount);
      return amount >= minBid && amount > 0;
    },

    getUserHighestBid: (car, userId) => {
      if (!car?.pujas || !userId) return null;
      
      const userBids = car.pujas
        .filter(bid => bid.userId === userId)
        .sort((a, b) => b.monto - a.monto);
      
      return userBids.length > 0 ? userBids[0].monto : null;
    },

    validateBidForm: (form, minBid) => {
      const errors = {};
      
      if (!form.amount) {
        errors.amount = biddingInterfaceData.validation.required;
      } else if (!biddingInterfaceHelpers.isValidBid(form.amount, minBid)) {
        errors.amount = biddingInterfaceData.validation.minimumBid.replace('{amount}', biddingInterfaceHelpers.formatPrice(minBid));
      }
      
      return errors;
    }
  };

  // Calculate auction status and bid info
  const auctionStatus = biddingInterfaceHelpers.getAuctionStatus(carDetails);
  const currentBid = carDetails?.pujaActual || carDetails?.precioInicial || 0;
  const nextMinBid = biddingInterfaceHelpers.calculateNextMinBid(currentBid);
  const userHighestBid = biddingInterfaceHelpers.getUserHighestBid(carDetails, user?.id);

  // Timer effect
  useEffect(() => {
    if (!carDetails?.fechaFin) return;

    const updateTimer = () => {
      const remaining = biddingInterfaceHelpers.calculateTimeLeft(carDetails.fechaFin);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [carDetails?.fechaFin]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert(biddingInterfaceData.messages.loginRequired);
      return;
    }

    const errors = biddingInterfaceHelpers.validateBidForm(bidForm, nextMinBid);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    try {
      const bidData = {
        carId: id,
        amount: Number(bidForm.amount),
        userId: user.id
      };
      
      // dispatch(placeBid(bidData));
      console.log('Placing bid:', bidData);
      
      // Reset form on success
      setBidForm({ amount: '' });
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuickBid = (increment) => {
    const newBidAmount = nextMinBid + increment;
    setBidForm({ amount: newBidAmount.toString() });
  };

  return {
    biddingInterfaceHelpers,
    biddingInterfaceData,
    bidForm,
    currentBid,
    nextMinBid,
    userHighestBid,
    auctionStatus,
    timeLeft,
    handleBidSubmit,
    handleBidChange,
    handleQuickBid,
    loading,
    error
  };
};