import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setLoading, setRespuesta } from "./venderSlide";


export const startGetNuevoVendedor =(body)=>{
  return async dispatch =>{
    dispatch(setLoading(true));
    try {
      const res = await fetch('post', `${_URL_DEV}/Vendedor/PostAlta`, body);
      console.log(res);
      if (res.ok) {
        dispatch(setRespuesta(res.data));
      };
      dispatch(setRespuesta(res.response.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };
};