import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import transactionsData from './transactionsData.json';

export const useTransactionsSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userReducer);
  
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    // Load user transactions
    if (user?.id) {
      // dispatch(fetchUserTransactions(user.id));
      
      // Mock data for now
      setAllTransactions([
        {
          id: 'TXN001',
          type: 'purchase',
          itemTitle: 'Toyota Camry 2020',
          itemDescription: 'Compra en subasta',
          amount: 25000,
          status: 'completed',
          date: '2024-01-15',
          paymentMethod: 'credit_card'
        },
        {
          id: 'TXN002',
          type: 'sale',
          itemTitle: 'Honda Civic 2019',
          itemDescription: 'Venta en subasta',
          amount: 22000,
          status: 'completed',
          date: '2024-01-10',
          paymentMethod: 'bank_transfer'
        },
        {
          id: 'TXN003',
          type: 'bid',
          itemTitle: 'Ford F-150 2021',
          itemDescription: 'Depósito de puja',
          amount: 500,
          status: 'pending',
          date: '2024-01-08',
          paymentMethod: 'credit_card'
        },
        {
          id: 'TXN004',
          type: 'refund',
          itemTitle: 'BMW X5 2020',
          itemDescription: 'Reembolso de puja',
          amount: 1000,
          status: 'completed',
          date: '2024-01-05',
          paymentMethod: 'credit_card'
        },
        {
          id: 'TXN005',
          type: 'fee',
          itemTitle: 'Comisión de venta',
          itemDescription: 'Comisión por venta de Honda Civic',
          amount: 1100,
          status: 'completed',
          date: '2024-01-03',
          paymentMethod: 'auto_deduct'
        }
      ]);
    }
  }, [user, dispatch]);

  const transactions = useMemo(() => {
    let filtered = allTransactions;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered.filter(transaction => new Date(transaction.date) >= filterDate);
      }
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [allTransactions, searchQuery, typeFilter, statusFilter, dateRange]);

  const transactionsHelpers = {
    getTypeBadgeClass: (type) => {
      const classes = {
        'purchase': 'bg-primary',
        'sale': 'bg-success',
        'bid': 'bg-info',
        'refund': 'bg-warning',
        'fee': 'bg-secondary'
      };
      return classes[type] || 'bg-secondary';
    },

    getTypeLabel: (type) => {
      const labels = {
        'purchase': 'Compra',
        'sale': 'Venta',
        'bid': 'Puja',
        'refund': 'Reembolso',
        'fee': 'Comisión'
      };
      return labels[type] || 'Desconocido';
    },

    getStatusBadgeClass: (status) => {
      const classes = {
        'completed': 'bg-success',
        'pending': 'bg-warning',
        'failed': 'bg-danger',
        'cancelled': 'bg-secondary'
      };
      return classes[status] || 'bg-secondary';
    },

    getStatusLabel: (status) => {
      const labels = {
        'completed': 'Completada',
        'pending': 'Pendiente',
        'failed': 'Fallida',
        'cancelled': 'Cancelada'
      };
      return labels[status] || 'Desconocido';
    },

    getAmountColorClass: (type) => {
      const creditTypes = ['sale', 'refund'];
      const debitTypes = ['purchase', 'bid', 'fee'];
      
      if (creditTypes.includes(type)) return 'success';
      if (debitTypes.includes(type)) return 'danger';
      return 'dark';
    },

    formatAmount: (amount, type) => {
      if (!amount) return transactionsData.defaults.amount;
      
      const creditTypes = ['sale', 'refund'];
      const debitTypes = ['purchase', 'bid', 'fee'];
      
      const formatted = `$${Number(amount).toLocaleString('en-US')}`;
      
      if (creditTypes.includes(type)) return `+${formatted}`;
      if (debitTypes.includes(type)) return `-${formatted}`;
      return formatted;
    },

    formatDate: (date) => {
      if (!date) return transactionsData.defaults.date;
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    getSummaryValue: (transactions, key) => {
      switch (key) {
        case 'total':
          return transactions.length;
        case 'completed':
          return transactions.filter(t => t.status === 'completed').length;
        case 'totalSpent':
          const spent = transactions
            .filter(t => ['purchase', 'bid', 'fee'].includes(t.type) && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
          return `$${spent.toLocaleString('en-US')}`;
        case 'totalEarned':
          const earned = transactions
            .filter(t => ['sale', 'refund'].includes(t.type) && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
          return `$${earned.toLocaleString('en-US')}`;
        default:
          return '0';
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleViewDetails = (transactionId) => {
    // Open transaction details modal or navigate to details page
    console.log('View transaction details:', transactionId);
  };

  const handleDownloadReceipt = (transactionId) => {
    // Download receipt PDF
    console.log('Download receipt:', transactionId);
  };

  return {
    transactionsHelpers,
    transactionsData,
    transactions,
    searchQuery,
    typeFilter,
    statusFilter,
    dateRange,
    handleSearch,
    handleTypeFilter,
    handleStatusFilter,
    handleDateRangeChange,
    handleViewDetails,
    handleDownloadReceipt,
    loading,
    error
  };
};