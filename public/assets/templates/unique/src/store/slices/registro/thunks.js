import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setRegistroError, setRegistroRespuesta } from "./registroSlice";


export const startRegistro =(body)=>{
  return async dispatch => {
    const res = await fetch('post', `${_URL_DEV}/Actions/PostPreComprador`,{
      app:'',
      ...body
    });
    if (res.ok) {
      dispatch(setRegistroRespuesta(res.data));
    }else {
      if (!res.response || res.response.status == 500);
      dispatch(setRegistroError("Error en servidor"));
      if (res.response.status == 400) dispatch(setRegistroError(res.response.data));
    }
  };
};
