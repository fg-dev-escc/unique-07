import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { 
  setLoading, 
  setPujaMartillo, 
  setPujaMayor, 
  setSubastaTorre, 
  setSubastaTorres, 
  setTorreComentarios,
  setFechaFin,
  setImagenPrincipal 
} from "./subastaSlice";

export const startGetSubastaTorres = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("get", `${_URL_DEV}/Subasta/GetTorres/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorres(response.data));
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
      const response = await fetch("get", `${_URL_DEV}/Subasta/GetTorre/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorre(response.data));
      }
    } catch (error) {
      console.error("No se cargó el contenido del auto:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const startPuja = (body) => {
  return async (dispatch) => {
    try {
      const res = await fetch('post', `${_URL_DEV}/Pujas/Pujar`, body);
      if (res.ok) {
        dispatch(setPujaMartillo(res.data));
      }
    } catch (error) {
      console.error('Problemas con hacer la puja:', error);
    }
  };
};

export const startSetPujaMayor = (monto, usuario) => {
  return async (dispatch) => {
    try {
      console.log('Setting puja mayor:', monto, usuario);
      dispatch(setPujaMayor({ monto, usuario }));
    } catch (error) {
      console.error('Problemas al traer la cantidad mayor:', error);
    }
  };
};

export const startGetTorreComentarios = (comentarios) => {
  return async (dispatch) => {
    try {
      dispatch(setTorreComentarios(comentarios));
    } catch (error) {
      console.error('Problemas con los comentarios:', error);
    }
  };
};

export const startEnviarComentario = (body) => {
  return async (dispatch) => {
    try {
      const res = await fetch('post', `${_URL_DEV}/Comentarios`, body);
      if (res.ok) {
        console.log('Comentario Agregado');
      }
    } catch (error) {
      console.log('Error enviando comentario:', error);
    }
  };
};

export const startSetFechaFin = (fechaFin) => {
  return async (dispatch) => {
    try {
      dispatch(setFechaFin(fechaFin));
    } catch (error) {
      console.error('Error setting fecha fin:', error);
    }
  };
};

export const startSetImagenPrincipal = (url) => {
  return async (dispatch) => {
    try {
      dispatch(setImagenPrincipal(url));
    } catch (error) {
      console.error('Error setting imagen principal:', error);
    }
  };
};