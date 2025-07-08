import React from 'react';

import { useCarCommentsSection } from './useCarCommentsSection';

const CarCommentsSection = () => {
  const {
    carCommentsHelpers,
    carCommentsData,
    comments,
    commentForm,
    showComments,
    currentUser,
    handleToggleComments,
    handleCommentSubmit,
    handleCommentChange,
    handleRatingChange,
    loading,
    error
  } = useCarCommentsSection();

  if (!showComments) return null;

  return (
    <div className="car-comments-section py-60">
      <div className="container">
        <div className="car-comments-wrapper">
          <div className="section-header">
            <h4>{carCommentsData.title}</h4>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleToggleComments}
            >
              {carCommentsData.buttons.hide}
            </button>
          </div>

          {/* Comments Summary */}
          <div className="comments-summary mb-4">
            <div className="row">
              <div className="col-md-4">
                <div className="rating-overview">
                  <div className="average-rating">
                    <span className="rating-score">{carCommentsHelpers.getAverageRating(comments)}</span>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fa${i < Math.floor(carCommentsHelpers.getAverageRating(comments)) ? 's' : 'r'} fa-star`}
                        ></i>
                      ))}
                    </div>
                    <small className="text-muted">
                      {comments.length} {carCommentsData.labels.reviews}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = carCommentsHelpers.getRatingCount(comments, rating);
                    const percentage = comments.length > 0 ? (count / comments.length) * 100 : 0;
                    
                    return (
                      <div key={rating} className="rating-bar">
                        <span className="rating-label">{rating} {carCommentsData.labels.stars}</span>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="rating-count">({count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Add Comment Form */}
          {currentUser && (
            <div className="add-comment-form mb-5">
              <h5>{carCommentsData.labels.addReview}</h5>
              <form onSubmit={handleCommentSubmit}>
                {/* Rating Selection */}
                <div className="rating-selection mb-3">
                  <label className="form-label">{carCommentsData.labels.yourRating}</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        className={`rating-star ${commentForm.rating >= rating ? 'active' : ''}`}
                        onClick={() => handleRatingChange(rating)}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <div className="mb-3">
                  <label className="form-label">{carCommentsData.labels.yourComment}</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="text"
                    value={commentForm.text || ''}
                    onChange={handleCommentChange}
                    placeholder={carCommentsData.placeholders.comment}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading || !commentForm.rating || !commentForm.text}
                >
                  {loading ? carCommentsData.buttons.submitting : carCommentsData.buttons.submit}
                </button>
              </form>
            </div>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {loading && (
              <div className="text-center py-4">
                {carCommentsData.messages.loading}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {comments.length > 0 ? (
                  <div className="comments-container">
                    {comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <div className="comment-header">
                          <div className="commenter-info">
                            <img 
                              src={comment.usuario?.avatar || carCommentsData.defaults.userAvatar} 
                              alt={comment.usuario?.nombre}
                              className="commenter-avatar"
                            />
                            <div className="commenter-details">
                              <h6>{comment.usuario?.nombre || carCommentsData.defaults.userName}</h6>
                              <div className="comment-rating">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={`fa${i < comment.calificacion ? 's' : 'r'} fa-star`}
                                  ></i>
                                ))}
                              </div>
                              <small className="text-muted">
                                {carCommentsHelpers.formatDate(comment.fecha)}
                              </small>
                            </div>
                          </div>
                          
                          {comment.verificado && (
                            <span className="badge bg-success">
                              <i className="far fa-check"></i>
                              {carCommentsData.labels.verified}
                            </span>
                          )}
                        </div>
                        
                        <div className="comment-content">
                          <p>{comment.comentario}</p>
                          
                          {comment.pros && comment.pros.length > 0 && (
                            <div className="comment-pros mb-2">
                              <strong>{carCommentsData.labels.pros}:</strong>
                              <ul>
                                {comment.pros.map((pro, i) => (
                                  <li key={i}>{pro}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {comment.cons && comment.cons.length > 0 && (
                            <div className="comment-cons">
                              <strong>{carCommentsData.labels.cons}:</strong>
                              <ul>
                                {comment.cons.map((con, i) => (
                                  <li key={i}>{con}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <div className="comment-actions">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="far fa-thumbs-up"></i>
                            {carCommentsData.buttons.helpful} ({comment.helpful || 0})
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Load More Comments */}
                    {comments.length >= 5 && (
                      <div className="text-center mt-4">
                        <button className="btn btn-outline-primary">
                          {carCommentsData.buttons.loadMore}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-comments fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">{carCommentsData.messages.noComments}</h5>
                    <p className="text-muted">{carCommentsData.messages.beFirst}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCommentsSection;