import React from 'react';

import { useTransactionsSection } from './useTransactionsSection';

const TransactionsSection = () => {
  const {
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
  } = useTransactionsSection();

  if (loading) return <div className="text-center py-4">{transactionsData.messages.loading}</div>;

  return (
    <div className="transactions-section">
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h5>{transactionsData.titles.transactionHistory}</h5>
          <div className="transaction-stats">
            <span className="badge bg-primary">
              {transactions.length} {transactionsData.labels.transactions}
            </span>
          </div>
        </div>
        
        <div className="user-profile-card-body">
          {/* Filters */}
          <div className="transactions-filters mb-4">
            <div className="row">
              <div className="col-md-4">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={transactionsData.placeholders.search}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={typeFilter}
                  onChange={handleTypeFilter}
                >
                  {transactionsData.typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={handleStatusFilter}
                >
                  {transactionsData.statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                >
                  {transactionsData.dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          {transactions.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {transactionsData.tableHeaders.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="transaction-id">
                          <strong>#{transaction.id}</strong>
                          <small className="d-block text-muted">
                            {transactionsHelpers.formatDate(transaction.date)}
                          </small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${transactionsHelpers.getTypeBadgeClass(transaction.type)}`}>
                          {transactionsHelpers.getTypeLabel(transaction.type)}
                        </span>
                      </td>
                      <td>
                        <div className="transaction-item">
                          {transaction.itemTitle}
                          <small className="d-block text-muted">
                            {transaction.itemDescription}
                          </small>
                        </div>
                      </td>
                      <td>
                        <span className={`text-${transactionsHelpers.getAmountColorClass(transaction.type)}`}>
                          {transactionsHelpers.formatAmount(transaction.amount, transaction.type)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${transactionsHelpers.getStatusBadgeClass(transaction.status)}`}>
                          {transactionsHelpers.getStatusLabel(transaction.status)}
                        </span>
                      </td>
                      <td>
                        <div className="transaction-actions">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewDetails(transaction.id)}
                            title={transactionsData.buttons.viewDetails}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {transaction.status === 'completed' && (
                            <button
                              className="btn btn-sm btn-outline-secondary ms-1"
                              onClick={() => handleDownloadReceipt(transaction.id)}
                              title={transactionsData.buttons.downloadReceipt}
                            >
                              <i className="fas fa-download"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-receipt fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">{transactionsData.messages.noTransactions}</h5>
              <p className="text-muted">{transactionsData.messages.startBidding}</p>
              <a href="/cars" className="btn btn-primary">
                {transactionsData.buttons.browseCars}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="user-profile-card mt-4">
        <div className="user-profile-card-header">
          <h5>{transactionsData.titles.summary}</h5>
        </div>
        <div className="user-profile-card-body">
          <div className="row">
            {transactionsData.summaryItems.map((item, index) => {
              const value = transactionsHelpers.getSummaryValue(transactions, item.key);
              return (
                <div key={index} className="col-md-3 mb-3">
                  <div className="transaction-summary-item">
                    <div className="summary-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="summary-content">
                      <h6>{value}</h6>
                      <p className="text-muted">{item.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default TransactionsSection;