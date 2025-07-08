import React from 'react';

import { useFavoritesSection } from './useFavoritesSection';

const FavoritesSection = () => {
  const {
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
  } = useFavoritesSection();

  if (loading) return <div className="text-center py-4">{favoritesData.messages.loading}</div>;

  return (
    <div className="favorites-section">
      <div className="user-profile-card">
        <div className="user-profile-card-header">
          <h5>{favoritesData.titles.myFavorites}</h5>
          <div className="favorites-stats">
            <span className="badge bg-primary">
              {favorites.length} {favoritesData.labels.vehicles}
            </span>
          </div>
        </div>
        
        <div className="user-profile-card-body">
          {/* Filters */}
          <div className="favorites-filters mb-4">
            <div className="row">
              <div className="col-md-8">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={favoritesData.placeholders.search}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={handleSort}
                >
                  {favoritesData.sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Favorites Grid */}
          {favorites.length > 0 ? (
            <div className="row">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="col-lg-6 col-xl-4 mb-4">
                  <div className="car-item favorite-item">
                    <div className="car-img">
                      <img 
                        src={favoritesHelpers.getCarImage(favorite)} 
                        alt={favorite.title}
                      />
                      <div className="car-btns">
                        <button
                          className="car-btn"
                          onClick={() => handleViewDetails(favorite.id)}
                          title={favoritesData.buttons.viewDetails}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                        <button
                          className="car-btn favorite-btn active"
                          onClick={() => handleRemoveFavorite(favorite.id)}
                          title={favoritesData.buttons.removeFavorite}
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="car-content">
                      <div className="car-top">
                        <h4>
                          <a href={`/car/${favorite.id}`}>{favorite.title}</a>
                        </h4>
                        <div className="car-rate">
                          <i className="fas fa-star"></i>
                          <span>{favorite.rating || favoritesData.defaults.rating}</span>
                        </div>
                      </div>
                      
                      <ul className="car-list">
                        <li>
                          <i className="far fa-car"></i>
                          {favoritesData.labels.model}: {favorite.model}
                        </li>
                        <li>
                          <i className="far fa-calendar"></i>
                          {favoritesData.labels.year}: {favorite.year}
                        </li>
                        <li>
                          <i className="far fa-gas-pump"></i>
                          {favorite.fuel || favoritesData.defaults.fuel}
                        </li>
                        <li>
                          <i className="far fa-road"></i>
                          {favoritesHelpers.formatMileage(favorite.mileage)}
                        </li>
                      </ul>
                      
                      <div className="car-footer">
                        <span className="car-price">
                          {favoritesHelpers.formatPrice(favorite.price)}
                          <sub>{favoritesData.labels.perMonth}</sub>
                        </span>
                        <div className="car-status">
                          <span className={`badge ${favoritesHelpers.getStatusBadgeClass(favorite.status)}`}>
                            {favoritesHelpers.getStatusLabel(favorite.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="favorite-meta">
                        <small className="text-muted">
                          {favoritesData.labels.addedOn} {favoritesHelpers.formatDate(favorite.addedAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-heart fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">{favoritesData.messages.noFavorites}</h5>
              <p className="text-muted">{favoritesData.messages.addFavorites}</p>
              <a href="/cars" className="btn btn-primary">
                {favoritesData.buttons.browseCars}
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

export default FavoritesSection;