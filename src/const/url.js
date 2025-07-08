const URL_DEV = import.meta.env.VITE_API_URL;
export const _URL_DEV = `${URL_DEV}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${_URL_DEV}/Login`,
  REFRESH_TOKEN: `${_URL_DEV}/Login/Refresh`,
  REGISTER: `${_URL_DEV}/Actions/PostPreComprador`,
  
  // Auctions
  AUCTION_DETAIL: (id) => `${_URL_DEV}/Auction/${id}`,
  AUCTION_FEATURED: `${_URL_DEV}/Auction/Featured`, 
  AUCTION_ACTIVE: `${_URL_DEV}/Auction/Active`,
  AUCTION_PLACE_BID: `${_URL_DEV}/Auction/PlaceBid`,
  AUCTION_ADD_COMMENT: `${_URL_DEV}/Auction/AddComment`,
  
  // Cars
  CARS_FEATURED: `${_URL_DEV}/Cars/Featured`,
  CARS_SEARCH: `${_URL_DEV}/Cars/Search`,
  
  // Home
  HOME_HERO_IMAGES: `${_URL_DEV}/Home/HeroImages`,
  HOME_SLIDESHOW: `${_URL_DEV}/Home/Slideshow`,
  
  // User/Profile
  USER_PROFILE: (id) => `${_URL_DEV}/User/Profile/${id}`,
  USER_CHANGE_PASSWORD: (id) => `${_URL_DEV}/User/ChangePassword/${id}`,
  USER_LISTINGS: (id) => `${_URL_DEV}/User/Listings/${id}`,
  USER_FAVORITES: (id) => `${_URL_DEV}/User/Favorites/${id}`,
  USER_TRANSACTIONS: (id) => `${_URL_DEV}/User/Transactions/${id}`,
  USER_BILLING: (id) => `${_URL_DEV}/User/Billing/${id}`,
  USER_TOGGLE_FAVORITE: `${_URL_DEV}/User/ToggleFavorite`,
  USER_BIDS: (id) => `${_URL_DEV}/User/Bids/${id}`,
  
  // Sell
  SELL_SUBMIT_CAR: `${_URL_DEV}/Sell/SubmitCar`,
  SELL_UPLOAD_IMAGES: `${_URL_DEV}/Sell/UploadImages`
};