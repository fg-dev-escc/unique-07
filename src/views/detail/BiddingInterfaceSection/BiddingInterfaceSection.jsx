import React from 'react';

import { useBiddingInterfaceSection } from './useBiddingInterfaceSection';

const BiddingInterfaceSection = () => {
  const {
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
  } = useBiddingInterfaceSection();

  if (auctionStatus === 'ended') {
    return (
      <div className="bidding-interface ended">
        <div className="auction-ended">
          <h5>{biddingInterfaceData.messages.auctionEnded}</h5>
          <p>{biddingInterfaceData.messages.finalBid}: {biddingInterfaceHelpers.formatPrice(currentBid)}</p>
        </div>
      </div>
    );
  }

  if (auctionStatus === 'inactive') {
    return (
      <div className="bidding-interface inactive">
        <div className="auction-inactive">
          <h5>{biddingInterfaceData.messages.auctionInactive}</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="bidding-interface">
      {/* Auction Timer */}
      <div className="auction-timer-section">
        <h5>{biddingInterfaceData.labels.timeRemaining}</h5>
        <div className="auction-timer">
          <span className="timer-display">{timeLeft}</span>
        </div>
      </div>

      {/* Current Bid Info */}
      <div className="current-bid-info">
        <div className="current-bid">
          <span className="bid-label">{biddingInterfaceData.labels.currentBid}:</span>
          <span className="bid-amount">{biddingInterfaceHelpers.formatPrice(currentBid)}</span>
        </div>
        
        {userHighestBid && (
          <div className="user-highest-bid">
            <span className="bid-label">{biddingInterfaceData.labels.yourHighestBid}:</span>
            <span className="bid-amount">{biddingInterfaceHelpers.formatPrice(userHighestBid)}</span>
          </div>
        )}
        
        <div className="next-min-bid">
          <span className="bid-label">{biddingInterfaceData.labels.nextMinBid}:</span>
          <span className="bid-amount">{biddingInterfaceHelpers.formatPrice(nextMinBid)}</span>
        </div>
      </div>

      {/* Quick Bid Buttons */}
      <div className="quick-bid-section">
        <h6>{biddingInterfaceData.labels.quickBid}</h6>
        <div className="quick-bid-buttons">
          {biddingInterfaceData.quickBidAmounts.map((amount, index) => (
            <button
              key={index}
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleQuickBid(amount)}
              disabled={loading}
            >
              +{biddingInterfaceHelpers.formatPrice(amount)}
            </button>
          ))}
        </div>
      </div>

      {/* Bid Form */}
      <div className="bid-form-section">
        <form onSubmit={handleBidSubmit}>
          <div className="bid-input-group">
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={bidForm.amount || ''}
                onChange={handleBidChange}
                placeholder={biddingInterfaceData.placeholders.bidAmount}
                min={nextMinBid}
                step="100"
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !biddingInterfaceHelpers.isValidBid(bidForm.amount, nextMinBid)}
              >
                {loading ? biddingInterfaceData.buttons.placing : biddingInterfaceData.buttons.placeBid}
              </button>
            </div>
          </div>
          
          {bidForm.amount && !biddingInterfaceHelpers.isValidBid(bidForm.amount, nextMinBid) && (
            <small className="text-danger">
              {biddingInterfaceData.validation.minimumBid.replace('{amount}', biddingInterfaceHelpers.formatPrice(nextMinBid))}
            </small>
          )}
        </form>
      </div>

      {/* Bid Terms */}
      <div className="bid-terms">
        <small className="text-muted">
          <i className="far fa-info-circle"></i>
          {biddingInterfaceData.terms.info}
        </small>
        <div className="terms-links">
          <a href="/terms" className="text-muted">{biddingInterfaceData.terms.termsLink}</a>
          {' | '}
          <a href="/bidding-help" className="text-muted">{biddingInterfaceData.terms.helpLink}</a>
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

export default BiddingInterfaceSection;