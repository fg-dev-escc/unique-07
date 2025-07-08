import { fetch, fetchSinToken } from "../../../api/api";
import {
  setLoginErr,
  setLoadingLogin,
  storeUser,
  setLogged,
  setResponseReg,
} from "./userSlice";
import parseJwt from "../../../utils/parseJwt";
import { consLogged } from "../../../const/consLogged";
import { _URL_DEV } from "../../../const/url";
import { setModalLogin } from "../modal/modalSlice";

export const startLogin = (body) => {
  return async (dispatch) => {
    dispatch(setLoginErr(null));
    dispatch(setLoadingLogin());

    const r = await fetchSinToken("post", `${_URL_DEV}/Login`, {
      app:"AppComprador",
      ...body,
    });
    if (r.ok) {
      localStorage.setItem("token", r.data.data);
      dispatch(storeUser(parseJwt(r.data.data)));
      dispatch(setModalLogin(false));
    } else {
      console.log({ r });
      if (!r.response || r.response.status == 500)
        dispatch(setLoginErr("Error en servidor"));
      if (r.response.status == 400) dispatch(setLoginErr(r.response.data));
    }
  };
};

export const startRefreshToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setLogged(consLogged.NOTLOGGED));
      return;
    } else {
      dispatch(storeUser(parseJwt(token)));
      dispatch(setLogged(consLogged.LOGGED));
    };
    
    const r = await fetchSinToken("post", `${_URL_DEV}/Login/Refresh`, {
      token,
      app: "AppComprador",
    });

    if (r.ok) {
      localStorage.setItem("token", r.data.data);
      dispatch(storeUser(parseJwt(r.data.data)));
      dispatch(setLogged(consLogged.LOGGED));
    } else {
      dispatch(setLogged(consLogged.NOTLOGGED));
      const token = localStorage.removeItem("token");
      if (!r.response || r.response.status == 500)
        dispatch(setLoginErr("Error en servidor"));
      if (r.response.status == 400) dispatch(setLoginErr(r.response.data));
    }
  };
};