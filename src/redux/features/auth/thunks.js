import { fetch, fetchSinToken } from "../../../api/api";
import { API_ENDPOINTS } from "../../../const/url";
import { setRegistroError, setRegistroRespuesta } from "./registerSlice";
import {
  setLoginErr,
  setLoadingLogin,
  storeUser,
  setLogged,
  setResponseReg,
} from "./userSlice";
import { parseJwt, setTokenToStorage, removeTokenFromStorage } from "../../../utils/jwtHelper";
import { consLogged } from "../../../const/consLogged";
import { setModalLogin } from "../../shared/modalSlice";


export const startLogin = (body) => {
  return async (dispatch) => {
    dispatch(setLoginErr(null));
    dispatch(setLoadingLogin(true));

    const r = await fetchSinToken("post", API_ENDPOINTS.LOGIN, {
      app: "AppComprador",
      ...body,
    });
    if (r.ok) {
      setTokenToStorage(r.data.data);
      const userData = parseJwt(r.data.data);
      dispatch(storeUser(userData));
      dispatch(setLogged(consLogged.LOGGED));
      dispatch(setLoadingLogin(false));
      
      // Cerrar modal si estaba abierto
      dispatch(setModalLogin(false));
      
      return { success: true };
    } else {
      let errorMessage = "Error de autenticación";
      if (!r.response || r.response.status === 500) {
        errorMessage = "Error en servidor";
      } else if (r.response.status === 400) {
        errorMessage = r.response.data.message || "Credenciales inválidas";
      } else if (r.response.status === 401) {
        errorMessage = "Email o contraseña incorrectos";
      }
      dispatch(setLoginErr(errorMessage));
      dispatch(setLogged(consLogged.NOTLOGGED));
      dispatch(setLoadingLogin(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const startRefreshToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setLogged(consLogged.NOTLOGGED));
      return;
    }

    try {
      dispatch(storeUser(parseJwt(token)));
      dispatch(setLogged(consLogged.LOGGED));
      
      const r = await fetchSinToken("post", API_ENDPOINTS.REFRESH_TOKEN, {
        token,
        app: "AppComprador",
      });

      if (r.ok) {
        setTokenToStorage(r.data.data);
        dispatch(storeUser(parseJwt(r.data.data)));
        dispatch(setLogged(consLogged.LOGGED));
      } else {
        dispatch(setLogged(consLogged.NOTLOGGED));
        removeTokenFromStorage();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      dispatch(setLogged(consLogged.NOTLOGGED));
      localStorage.removeItem("token");
    }
  };
};

export const startRegistro = (body) => {
  return async (dispatch) => {
    dispatch(setRegistroError(null));
    dispatch(setLoadingLogin(true));

    try {
      const res = await fetchSinToken('post', API_ENDPOINTS.REGISTER, {
        app: 'AppComprador',
        ...body
      });
      
      if (res.ok) {
        dispatch(setRegistroRespuesta(res.data));
        dispatch(setLoadingLogin(false));
        return { success: true, data: res.data };
      } else {
        let errorMessage = "Error en registro";
        
        if (!res.response || res.response.status === 500) {
          errorMessage = "Error en servidor";
        } else if (res.response.status === 400) {
          errorMessage = res.response.data.message || "Datos inválidos";
        } else if (res.response.status === 409) {
          errorMessage = "El email ya está registrado";
        }
        
        dispatch(setRegistroError(errorMessage));
        dispatch(setLoadingLogin(false));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error("Error en registro:", error);
      const errorMessage = "Error de conexión. Verifica tu internet.";
      dispatch(setRegistroError(errorMessage));
      dispatch(setLoadingLogin(false));
      return { success: false, error: errorMessage };
    }
  };
};

// Logout
export const startLogout = () => {
  return async (dispatch) => {
    try {
      removeTokenFromStorage();
      dispatch(setLogged(consLogged.NOTLOGGED));
      dispatch(storeUser(null));
      
      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };
};
