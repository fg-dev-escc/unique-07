import React, { useState } from 'react';

import ProfileLayout from '../ProfileLayout';

const TransactionHistory = () => {
  const [transactions] = useState([
    {
      id: '#12345',
      pickUp: 'New York, USA',
      dropUp: 'New York, USA',
      duration: '1 Months',
      price: '$600',
      status: 'Completed',
      statusClass: 'text-success',
      date: '2024-01-15'
    },
    {
      id: '#12346',
      pickUp: 'Los Angeles, USA',
      dropUp: 'San Francisco, USA',
      duration: '2 Weeks',
      price: '$450',
      status: 'Pending',
      statusClass: 'text-warning',
      date: '2024-01-20'
    },
    {
      id: '#12347',
      pickUp: 'Miami, USA',
      dropUp: 'Orlando, USA',
      duration: '5 Days',
      price: '$300',
      status: 'Cancelled',
      statusClass: 'text-danger',
      date: '2024-01-25'
    },
    {
      id: '#12348',
      pickUp: 'Chicago, USA',
      dropUp: 'Detroit, USA',
      duration: '3 Days',
      price: '$250',
      status: 'Active',
      statusClass: 'text-primary',
      date: '2024-02-01'
    }
  ]);

  const handleViewTransaction = (transactionId) => {
    // TODO: Navigate to transaction detail or show modal
    console.log('View transaction:', transactionId);
  };

  return (
    <ProfileLayout title="Transaction">
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>Transaction</h4>
        </div>
        <div className="car-table-content">
          <div className="car-table table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Pick Up</th>
                  <th scope="col">Drop Up</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="order-id">{transaction.id}</div>
                    </td>
                    <td>
                      <div className="pick-up">{transaction.pickUp}</div>
                    </td>
                    <td>
                      <div className="drop-up">{transaction.dropUp}</div>
                    </td>
                    <td>
                      <div className="duration">{transaction.duration}</div>
                    </td>
                    <td>
                      <div className="price">{transaction.price}</div>
                    </td>
                    <td>
                      <div className={`status ${transaction.statusClass}`}>
                        {transaction.status}
                      </div>
                    </td>
                    <td>
                      <div className="car-table-action">
                        <button 
                          type="button"
                          className="car-action-btn"
                          onClick={() => handleViewTransaction(transaction.id)}
                        >
                          <i className="far fa-eye"></i>
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

export default TransactionHistory;