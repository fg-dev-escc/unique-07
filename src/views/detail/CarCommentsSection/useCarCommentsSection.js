import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import carCommentsData from './carCommentsData.json';

export const useCarCommentsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails, loading, error } = useSelector(state => state.auctionReducer);
  const { user: currentUser } = useSelector(state => state.userReducer);
  
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ rating: 0, text: '' });
  const [showComments, setShowComments] = useState(true);

  const carCommentsHelpers = {
    extractComments: (car) => {
      if (!car) return [];
      
      let comments = car.comentarios || car.reseñas || car.reviews || [];
      
      comments = comments.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      
      return comments;
    },

    getAverageRating: (comments) => {
      if (!comments || comments.length === 0) return 0;
      
      const total = comments.reduce((sum, comment) => sum + (comment.calificacion || 0), 0);
      return (total / comments.length).toFixed(1);
    },

    getRatingCount: (comments, rating) => {
      if (!comments || comments.length === 0) return 0;
      
      return comments.filter(comment => comment.calificacion === rating).length;
    },

    formatDate: (date) => {
      if (!date) return carCommentsData.defaults.date;
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    validateCommentForm: (form) => {
      const errors = {};
      
      if (!form.rating || form.rating < 1 || form.rating > 5) {
        errors.rating = carCommentsData.validation.ratingRequired;
      }
      
      if (!form.text || form.text.trim().length < 10) {
        errors.text = carCommentsData.validation.commentTooShort;
      }
      
      if (form.text && form.text.length > 1000) {
        errors.text = carCommentsData.validation.commentTooLong;
      }
      
      return errors;
    },

    hasUserCommented: (comments, userId) => {
      if (!comments || !userId) return false;
      
      return comments.some(comment => 
        comment.usuario?.id === userId || comment.userId === userId
      );
    },

    getCommentStats: (comments) => {
      if (!comments || comments.length === 0) {
        return {
          total: 0,
          average: 0,
          distribution: [0, 0, 0, 0, 0]
        };
      }
      
      const total = comments.length;
      const average = carCommentsHelpers.getAverageRating(comments);
      const distribution = [1, 2, 3, 4, 5].map(rating => 
        carCommentsHelpers.getRatingCount(comments, rating)
      );
      
      return { total, average, distribution };
    },

    filterCommentsByRating: (comments, rating) => {
      if (!comments || !rating) return comments;
      
      return comments.filter(comment => comment.calificacion === rating);
    },

    sortComments: (comments, sortBy) => {
      if (!comments) return [];
      
      const sorted = [...comments];
      
      switch (sortBy) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        case 'oldest':
          return sorted.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        case 'highest':
          return sorted.sort((a, b) => (b.calificacion || 0) - (a.calificacion || 0));
        case 'lowest':
          return sorted.sort((a, b) => (a.calificacion || 0) - (b.calificacion || 0));
        case 'helpful':
          return sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
        default:
          return sorted;
      }
    }
  };

  useEffect(() => {
    if (carDetails) {
      const carComments = carCommentsHelpers.extractComments(carDetails);
      setComments(carComments);
    }
  }, [carDetails]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert(carCommentsData.messages.loginRequired);
      return;
    }

    const errors = carCommentsHelpers.validateCommentForm(commentForm);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    if (carCommentsHelpers.hasUserCommented(comments, currentUser.id)) {
      alert(carCommentsData.messages.alreadyCommented);
      return;
    }

    try {
      const commentData = {
        carId: id,
        userId: currentUser.id,
        calificacion: commentForm.rating,
        comentario: commentForm.text.trim(),
        fecha: new Date().toISOString(),
        usuario: {
          id: currentUser.id,
          nombre: currentUser.name || currentUser.displayName,
          avatar: currentUser.avatar
        }
      };
      
      console.log('Adding comment:', commentData);
      
      setComments(prev => [commentData, ...prev]);
      
      setCommentForm({ rating: 0, text: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setCommentForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleHelpfulClick = (commentIndex) => {
    setComments(prev => 
      prev.map((comment, index) => 
        index === commentIndex 
          ? { ...comment, helpful: (comment.helpful || 0) + 1 }
          : comment
      )
    );
  };

  return {
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
    handleHelpfulClick,
    loading,
    error
  };
};