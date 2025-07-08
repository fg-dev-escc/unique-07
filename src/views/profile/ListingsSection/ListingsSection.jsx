import React from 'react';

import { useListingsSection } from './useListingsSection';

const ListingsSection = () => {
  const {
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
  } = useListingsSection();

  if (loading) return <div className="text-center py-4">{listingsData.messages.loading}</div>;

  return (
    <div className="listings-section">
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h5>{listingsData.titles.myListings}</h5>
          <a href="/sell" className="btn btn-primary btn-sm">
            {listingsData.buttons.addListing}
          </a>
        </div>
        
        <div className="user-profile-card-body">
          {/* Filters */}
          <div className="listings-filters mb-4">
            <div className="row">
              <div className="col-md-8">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={listingsData.placeholders.search}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={handleStatusFilter}
                >
                  {listingsData.statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Listings Table */}
          {listings.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {listingsData.tableHeaders.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td>
                        <div className="listing-info">
                          <img 
                            src={listingsHelpers.getListingImage(listing)} 
                            alt={listing.title}
                            className="listing-thumb"
                          />
                          <div className="listing-details">
                            <h6>{listing.title}</h6>
                            <small className="text-muted">{listing.model}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${listingsHelpers.getStatusBadgeClass(listing.status)}`}>
                          {listingsHelpers.getStatusLabel(listing.status)}
                        </span>
                      </td>
                      <td>{listingsHelpers.formatPrice(listing.price)}</td>
                      <td>{listingsHelpers.formatDate(listing.createdAt)}</td>
                      <td>{listing.views || 0}</td>
                      <td>{listing.bids || 0}</td>
                      <td>
                        <div className="listing-actions">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditListing(listing.id)}
                            title={listingsData.buttons.edit}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary ms-1"
                            onClick={() => handleToggleStatus(listing.id)}
                            title={listingsHelpers.getToggleStatusLabel(listing.status)}
                          >
                            <i className={listingsHelpers.getToggleStatusIcon(listing.status)}></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger ms-1"
                            onClick={() => handleDeleteListing(listing.id)}
                            title={listingsData.buttons.delete}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-car fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">{listingsData.messages.noListings}</h5>
              <p className="text-muted">{listingsData.messages.addFirstListing}</p>
              <a href="/sell" className="btn btn-primary">
                {listingsData.buttons.addListing}
              </a>
            </div>
          )}
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

export default ListingsSection;