import React, { useState } from 'react';

import ProfileLayout from '../ProfileLayout';

const Listings = () => {
  // Mock data - en producción esto vendría de Redux/API
  const [listings] = useState([
    {
      id: 1,
      image: '/assets/img/car/01.jpg',
      name: 'Toyota Sports Car',
      year: 2020,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      price: '$600'
    },
    {
      id: 2,
      image: '/assets/img/car/02.jpg',
      name: 'BMW X5 2021',
      year: 2021,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      price: '$800'
    },
    {
      id: 3,
      image: '/assets/img/car/03.jpg',
      name: 'Mercedes C-Class',
      year: 2019,
      transmission: 'Manual',
      fuelType: 'Diesel',
      price: '$750'
    }
  ]);

  const handleRemoveListing = (id) => {
    if (window.confirm('Are you sure you want to remove this listing?')) {
      // TODO: Dispatch remove listing action
      console.log('Remove listing:', id);
    }
  };

  return (
    <ProfileLayout title="My Car Listing">
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>My Car Listing</h4>
        </div>
        <div className="car-table-content">
          <div className="car-table table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Car</th>
                  <th scope="col">Year</th>
                  <th scope="col">Transmission</th>
                  <th scope="col">Fuel Type</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.id}>
                    <td>
                      <div className="car-table-item">
                        <div className="car-table-item-img">
                          <img src={listing.image} alt={listing.name} />
                        </div>
                        <div className="car-table-item-content">
                          <h6 className="car-table-item-title">
                            <a href="#">{listing.name}</a>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="car-table-year">{listing.year}</div>
                    </td>
                    <td>
                      <div className="car-table-transmission">{listing.transmission}</div>
                    </td>
                    <td>
                      <div className="car-table-fuel">{listing.fuelType}</div>
                    </td>
                    <td>
                      <div className="car-table-price">{listing.price}/day</div>
                    </td>
                    <td>
                      <div className="car-table-action">
                        <a href="#" className="car-action-btn"><i className="far fa-eye"></i></a>
                        <a href="#" className="car-action-btn"><i className="far fa-pen"></i></a>
                        <button 
                          type="button"
                          className="car-action-btn"
                          onClick={() => handleRemoveListing(listing.id)}
                        >
                          <i className="far fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Listings;