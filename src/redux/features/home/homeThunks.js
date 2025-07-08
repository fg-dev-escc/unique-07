import { fetchSinToken } from "../../../api/api";
import { API_ENDPOINTS } from "../../../const/url";
import { 
  setHeroImages,
  setFeaturedCars,
  setActiveAuctions,
  setHomeLoading,
  setHomeError
} from "./homeSlice";
import { subscribeToCarListings } from "../../../utils/firebaseHelpers";

// Get hero slideshow images - basado en el patrón del template único
export const startGetHeroImages = () => {
  return async (dispatch) => {
    dispatch(setHomeLoading(true));
    
    try {
      const response = await fetchSinToken("get", API_ENDPOINTS.HOME_SLIDESHOW);
      
      if (response.ok) {
        dispatch(setHeroImages(response.data));
      } else {
        console.warn("No hero images found, using defaults");
        // Fallback a imágenes por defecto si no hay en API
        dispatch(setHeroImages([
          {
            id: 1,
            image: "/assets/img/slider/01.jpg",
            title: "Encuentra tu vehículo ideal",
            subtitle: "Subastas de vehículos de calidad"
          }
        ]));
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
      dispatch(setHomeError("Error loading slideshow"));
    } finally {
      dispatch(setHomeLoading(false));
    }
  };
};

// Get featured cars with real-time updates
export const startGetFeaturedCars = () => {
  return async (dispatch) => {
    try {
      // Get initial data from API
      const response = await fetchSinToken("get", `${_URL_DEV}/Cars/Featured`);
      
      if (response.ok) {
        dispatch(setFeaturedCars(response.data));
      }
      
      // Set up real-time listener for live updates
      const unsubscribe = subscribeToCarListings((cars) => {
        dispatch(setFeaturedCars(cars.filter(car => car.featured)));
      });
      
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching featured cars:", error);
      dispatch(setHomeError("Error loading featured cars"));
    }
  };
};

// Get active auctions
export const startGetActiveAuctions = () => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken("get", `${_URL_DEV}/Auction/Active`);
      
      if (response.ok) {
        dispatch(setActiveAuctions(response.data));
      } else {
        dispatch(setHomeError("Error loading active auctions"));
      }
    } catch (error) {
      console.error("Error fetching active auctions:", error);
      dispatch(setHomeError("Network error"));
    }
  };
};

// Initialize home page data
export const startInitializeHome = () => {
  return async (dispatch) => {
    const promises = [
      dispatch(startGetHeroImages()),
      dispatch(startGetFeaturedCars()),
      dispatch(startGetActiveAuctions())
    ];
    
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("Error initializing home:", error);
    }
  };
};