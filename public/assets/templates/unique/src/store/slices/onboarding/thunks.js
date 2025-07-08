import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setLoading, setNuevoUsuario, setRespuestaForm } from "./onboardingSlice";


export const startCargaFormOnboardingUsuario = (body)=>{
  return async dispatch =>{
    dispatch(setLoading(true));
    try {
      const res = await fetch('post', `${_URL_DEV}/`, body);
      if (res.ok) {
        dispatch(setNuevoUsuario(res.data));
      };
    } catch (error) {
      console.log(error);
    };
    dispatch(setLoading(false));
  };
};

export const startCargaFormOnboardingFotos =(body)=>{
  return async dispatch =>{
    dispatch(setLoading(true));
    try {
      const res = await fetch('post', `${_URL_DEV}/`, body);
      if (res.ok) {
        dispatch(setRespuestaForm(res.data));
      };
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};