import React, { useState } from 'react';
import { mockComments } from '../../../mocks';

const CarComments = () => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({
    userName: '',
    userEmail: '',
    comment: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (rating) => {
    setNewComment({ ...newComment, rating });
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.userName && newComment.userEmail && newComment.comment && newComment.rating > 0) {
      const comment = {
        id: comments.length + 1,
        userName: newComment.userName,
        userImage: "assets/img/blog/com-1.jpg",
        date: new Date().toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        rating: newComment.rating,
        comment: newComment.comment
      };
      
      setComments([...comments, comment]);
      setNewComment({ userName: '', userEmail: '', comment: '', rating: 0 });
      setHoverRating(0);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const renderRatingInput = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`${
            i <= (hoverRating || newComment.rating) ? 'fas' : 'far'
          } fa-star`}
          style={{ cursor: 'pointer', color: '#ffc107' }}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="car-single-review">
      <div className="blog-comments">
        <h3>Comentarios ({comments.length})</h3>
        <div className="blog-comments-wrapper">
          {comments.map((comment) => (
            <div key={comment.id} className="blog-comments-single">
              <img src={comment.userImage} alt="thumb" />
              <div className="blog-comments-content">
                <h5>{comment.userName}</h5>
                <div className="mb-2">
                  <div className="car-single-rating d-inline-block me-3">
                    {renderStars(comment.rating)}
                  </div>
                  <span><i className="far fa-clock"></i> {comment.date}</span>
                </div>
                <p>{comment.comment}</p>
                <a href="#"><i className="far fa-reply"></i> Responder</a>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-comments-form">
          <h3>Dejar un Comentario</h3>
          <form onSubmit={handleSubmitComment}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group car-review-rating">
                  <label>Tu Calificación</label>
                  <div>
                    {renderRatingInput()}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tu Nombre*"
                    value={newComment.userName}
                    onChange={(e) => setNewComment({ ...newComment, userName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Tu Email*"
                    value={newComment.userEmail}
                    onChange={(e) => setNewComment({ ...newComment, userEmail: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    rows="5" 
                    placeholder="Tu Comentario*"
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="theme-btn">
                  <i className="far fa-paper-plane"></i> Enviar Comentario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarComments;