import React from 'react';

import { useBiddingHistorySection } from './useBiddingHistorySection';

const BiddingHistorySection = () => {
  const {
    biddingHistoryHelpers,
    biddingHistoryData,
    biddingHistory,
    showHistory,
    handleToggleHistory,
    loading,
    error
  } = useBiddingHistorySection();

  if (!showHistory) return null;

  return (
    <div className="bidding-history-section py-60">
      <div className="container">
        <div className="bidding-history-wrapper">
          <div className="section-header">
            <h4>{biddingHistoryData.title}</h4>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleToggleHistory}
            >
              {biddingHistoryData.buttons.hide}
            </button>
          </div>

          {loading && (
            <div className="text-center py-4">
              {biddingHistoryData.messages.loading}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {biddingHistory.length > 0 ? (
                <div className="bidding-history-content">
                  {/* Summary Stats */}
                  <div className="bidding-stats mb-4">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="stat-item">
                          <h6>{biddingHistory.length}</h6>
                          <small className="text-muted">{biddingHistoryData.labels.totalBids}</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stat-item">
                          <h6>{biddingHistoryHelpers.getUniqueBidders(biddingHistory)}</h6>
                          <small className="text-muted">{biddingHistoryData.labels.bidders}</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stat-item">
                          <h6>{biddingHistoryHelpers.formatPrice(biddingHistoryHelpers.getHighestBid(biddingHistory))}</h6>
                          <small className="text-muted">{biddingHistoryData.labels.highestBid}</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stat-item">
                          <h6>{biddingHistoryHelpers.formatPrice(biddingHistoryHelpers.getAverageBid(biddingHistory))}</h6>
                          <small className="text-muted">{biddingHistoryData.labels.averageBid}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bidding Table */}
                  <div className="table-responsive">
                    <table className="table table-striped bidding-history-table">
                      <thead>
                        <tr>
                          {biddingHistoryData.tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {biddingHistory.map((bid, index) => (
                          <tr key={index} className={biddingHistoryHelpers.getBidRowClass(bid, index)}>
                            <td>
                              <span className="bid-rank">#{biddingHistory.length - index}</span>
                            </td>
                            <td>
                              <span className="bid-amount">
                                {biddingHistoryHelpers.formatPrice(bid.monto)}
                              </span>
                              {index === 0 && (
                                <span className="badge bg-success ms-2">
                                  {biddingHistoryData.labels.winning}
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="bidder-info">
                                <img 
                                  src={bid.usuario?.avatar || biddingHistoryData.defaults.userAvatar} 
                                  alt={biddingHistoryHelpers.getBidderName(bid.usuario)}
                                  className="bidder-avatar"
                                />
                                <span className="bidder-name">
                                  {biddingHistoryHelpers.getBidderName(bid.usuario)}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="bid-time">
                                {biddingHistoryHelpers.formatDateTime(bid.fecha)}
                              </span>
                              <small className="d-block text-muted">
                                {biddingHistoryHelpers.getTimeAgo(bid.fecha)}
                              </small>
                            </td>
                            <td>
                              <span className={`badge ${biddingHistoryHelpers.getStatusBadgeClass(bid.estado)}`}>
                                {biddingHistoryHelpers.getStatusLabel(bid.estado)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination or Load More */}
                  {biddingHistory.length >= 10 && (
                    <div className="text-center mt-4">
                      <button className="btn btn-outline-primary">
                        {biddingHistoryData.buttons.loadMore}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-gavel fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">{biddingHistoryData.messages.noBids}</h5>
                  <p className="text-muted">{biddingHistoryData.messages.beFirstBidder}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingHistorySection;