import { fetch, fetchSinToken } from "../../../api/api";
import { API_ENDPOINTS } from "../../../const/url";
import { 
  setLoading, 
  setPujaMartillo, 
  setPujaMayor, 
  setSubastaTorre, 
  setSubastaTorres, 
  setTorreComentarios,
  setLoadingPuja,
  setErrorPuja,
  addPuja
} from "./auctionSlice";
export const startGetSubastaTorres = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("get", `${API_ENDPOINTS.BASE}/Subasta/GetTorres/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorres(response.data));
      } else {
        console.error("Error al cargar las torres de subasta");
      }
    } catch (error) {
      console.error("No se cargó el contenido principal:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const startGetSubastaTorre = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("get", `${API_ENDPOINTS.BASE}/Subasta/GetTorre/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorre(response.data));
      } else {
        console.error("Error al cargar la torre de subasta");
      }
    } catch (error) {
      console.error("No se cargó el contenido del auto:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Place a bid
export const startPlaceBid = (auctionId, bidData) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    if (!user) {
      dispatch(setAuctionError("Must be logged in to bid"));
      return;
    }
    
    try {
      // First, validate bid with API
      const bidBody = {
        auctionId,
        amount: bidData.amount,
        userId: user.usuarioID,
        userNickname: user.nickname || user.nombre,
        comment: bidData.comment || ""
      };
      
      const response = await fetch("post", `${_URL_DEV}/Auction/PlaceBid`, bidBody);
      
      if (response.ok) {
        // If API validates, update Firebase for real-time
        await addBidToAuction(auctionId, {
          ...bidBody,
          id: response.data.bidId
        });
        
        // Optimistic update
        dispatch(addNewBid(bidBody));
      } else {
        dispatch(setAuctionError(response.response?.data || "Error placing bid"));
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      dispatch(setAuctionError("Network error"));
    }
  };
};

// Add comment
export const startAddComment = (auctionId, commentText) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    if (!user) {
      dispatch(setAuctionError("Must be logged in to comment"));
      return;
    }
    
    try {
      const commentData = {
        auctionId,
        text: commentText,
        userId: user.usuarioID,
        userNickname: user.nickname || user.nombre
      };
      
      // Add to Firebase for real-time updates
      await addCommentToAuction(auctionId, commentData);
      
      // Also save to API for persistence
      await fetch("post", `${_URL_DEV}/Auction/AddComment`, commentData);
      
      // Optimistic update
      dispatch(addNewComment(commentData));
    } catch (error) {
      console.error("Error adding comment:", error);
      dispatch(setAuctionError("Error adding comment"));
    }
  };
};

// Get user's bid history
export const startGetUserBids = () => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    if (!user) return;
    
    try {
      const response = await fetch("get", `${_URL_DEV}/User/Bids/${user.usuarioID}`);
      
      if (response.ok) {
        // Handle user bid history
        // dispatch(setUserBids(response.data));
      }
    } catch (error) {
      console.error("Error fetching user bids:", error);
    }
  };
};

// Get featured auctions for home page
export const startGetFeaturedAuctions = () => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken("get", `${_URL_DEV}/Auction/Featured`);
      
      if (response.ok) {
        // dispatch(setFeaturedAuctions(response.data));
      }
    } catch (error) {
      console.error("Error fetching featured auctions:", error);
    }
  };
};