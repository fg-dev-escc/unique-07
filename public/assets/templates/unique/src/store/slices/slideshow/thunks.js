import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setCars, setGridCars, setLoading } from "./slideshowSlice";

export const startGetCars = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('get', `${_URL_DEV}/ImageWeb/SlideShow`);
      if (response.ok) {
        dispatch(setCars(response.data));
      };
    } catch (error) {
      console.error("No se cargaron las imagenes del carrucel:");
    };
    dispatch(setLoading(false));
  };
};

export const startGetGridCars = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('get', `${_URL_DEV}/ImageWeb/CarsGrid`);
      if (response.ok) {
        dispatch(setGridCars(response.data));
      };
    } catch (error) {
      console.error("No se cargaron las imagenes del grid:");
    };
    dispatch(setLoading(false));
  };
};