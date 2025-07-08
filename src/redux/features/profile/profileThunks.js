import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { storeUser } from "../auth/userSlice";

// Update user profile
export const startUpdateProfile = (profileData) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("put", `${_URL_DEV}/User/Profile/${user.usuarioID}`, profileData);
      
      if (response.ok) {
        // Update user in Redux state
        dispatch(storeUser({
          ...user,
          ...response.data
        }));
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.response?.data || "Error updating profile" 
        };
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Change password
export const startChangePassword = (passwordData) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("put", `${_URL_DEV}/User/ChangePassword/${user.usuarioID}`, passwordData);
      
      if (response.ok) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.response?.data || "Error changing password" 
        };
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Get user's listings
export const startGetUserListings = () => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("get", `${_URL_DEV}/User/Listings/${user.usuarioID}`);
      
      if (response.ok) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Error loading listings" };
      }
    } catch (error) {
      console.error("Error fetching user listings:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Get user's favorites
export const startGetUserFavorites = () => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("get", `${_URL_DEV}/User/Favorites/${user.usuarioID}`);
      
      if (response.ok) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Error loading favorites" };
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Add/remove favorite
export const startToggleFavorite = (carId) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("post", `${_URL_DEV}/User/ToggleFavorite`, {
        userId: user.usuarioID,
        carId
      });
      
      if (response.ok) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Error updating favorite" };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Get user's transactions
export const startGetUserTransactions = () => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("get", `${_URL_DEV}/User/Transactions/${user.usuarioID}`);
      
      if (response.ok) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "Error loading transactions" };
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return { success: false, error: "Network error" };
    }
  };
};

// Update billing information
export const startUpdateBilling = (billingData) => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducer;
    
    try {
      const response = await fetch("put", `${_URL_DEV}/User/Billing/${user.usuarioID}`, billingData);
      
      if (response.ok) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.response?.data || "Error updating billing info" 
        };
      }
    } catch (error) {
      console.error("Error updating billing:", error);
      return { success: false, error: "Network error" };
    }
  };
};