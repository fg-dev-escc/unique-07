import React, { useState } from 'react';

import ProfileLayout from '../ProfileLayout';

const FavoritesCars = () => {
  // Mock data - en producción esto vendría de Redux/API
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      image: '/assets/img/car/01.jpg',
      name: 'Toyota Sports Car',
      rating: 5.0,
      model: '2020',
      people: '4 People',
      fuel: 'Hybrid',
      consumption: '10.15km / 1-litre',
      transmission: 'Automatic',
      price: 390,
      period: 'month'
    },
    {
      id: 2,
      image: '/assets/img/car/02.jpg',
      name: 'BMW X5 SUV',
      rating: 4.8,
      model: '2021',
      people: '5 People',
      fuel: 'Petrol',
      consumption: '8.5km / 1-litre',
      transmission: 'Automatic',
      price: 520,
      period: 'month'
    },
    {
      id: 3,
      image: '/assets/img/car/03.jpg',
      name: 'Mercedes C-Class',
      rating: 4.9,
      model: '2019',
      people: '4 People',
      fuel: 'Diesel',
      consumption: '12.2km / 1-litre',
      transmission: 'Manual',
      price: 450,
      period: 'month'
    }
  ]);

  const handleRemoveFavorite = (carId) => {
    if (window.confirm('Remove this car from favorites?')) {
      setFavorites(prev => prev.filter(car => car.id !== carId));
    }
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <ProfileLayout title="Favorite">
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Favorite</h4>
        </div>
        <div className="row align-items-center">
          {favorites.map(car => (
            <div key={car.id} className="col-lg-6 col-xl-4">
              <div className="car-item wow fadeInUp" data-wow-delay=".25s">
                <div className="car-img">
                  <img src={car.image} alt={car.name} />
                  <div className="car-btns">
                    <a href="#" className="car-btn">
                      <i className="far fa-eye"></i>
                    </a>
                    <button 
                      type="button"
                      className="car-btn"
                      onClick={() => handleRemoveFavorite(car.id)}
                    >
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="car-content">
                  <div className="car-top">
                    <h4><a href="#">{car.name}</a></h4>
                    <div className="car-rate">
                      <i className="fas fa-star"></i>
                      <span>{car.rating}</span>
                    </div>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>Model: {car.model}</li>
                    <li><i className="far fa-user-tie"></i>{car.people}</li>
                    <li><i className="far fa-gas-pump"></i>{car.fuel}</li>
                    <li><i className="far fa-road"></i>{car.consumption}</li>
                    <li><i className="far fa-steering-wheel"></i>{car.transmission}</li>
                  </ul>
                  <div className="car-footer">
                    <span className="car-price">
                      {formatPrice(car.price)} <sub>/{car.period}</sub>
                    </span>
                    <a href="#" className="theme-btn">
                      Book Now<i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {favorites.length === 0 && (
          <div className="text-center py-5">
            <i className="far fa-heart fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No favorite cars yet</h5>
            <p className="text-muted">Browse our cars and add them to your favorites!</p>
            <a href="/" className="theme-btn">Browse Cars</a>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default FavoritesCars;