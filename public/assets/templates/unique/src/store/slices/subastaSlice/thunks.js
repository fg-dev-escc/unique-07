import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setLoading, setPujaMartillo, setPujaMayor, setSubastaTorre, setSubastaTorres, setTorreComentarios } from "./subastaSlice";

export const startGetSubastaTorres = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("get", `${_URL_DEV}/Subasta/GetTorres/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorres(response.data));
      };
    } catch (error) {
      console.error("No se cargó el contenido principal:");
    };
    dispatch(setLoading(false));
  };
};

export const startGetSubastaTorre = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("get", `${_URL_DEV}/Subasta/GetTorre/${id}`);
      if (response.ok) {
        dispatch(setSubastaTorre(response.data));
      };
    } catch (error) {
      console.error("No se cargó el contenido del auto");
    };
    dispatch(setLoading(false));
  };
};

export const startPuja = (body)=>{
  return async dispatch =>{
    try {
      const res = await fetch('post', `${_URL_DEV}/Pujas/Pujar`, body);
      if (res.ok) {
        dispatch(setPujaMartillo(res.data));
      };
    } catch (error) {
      console.error('Problemas con hacer la puja');
    };
  };
};

export const startSetPujaMayor = (monto, usuario)=>{
  return async dispatch =>{
    try {
      console.log(monto, usuario);
      dispatch(setPujaMayor({monto,usuario}));
    } catch (error) {
      console.error('Problemas al traer la cantidad mayor');
    };
  };
};

export const startGetTorreComentarios = (comentarios)=>{
  return async dispatch =>{
    try {
      dispatch(setTorreComentarios(comentarios));
    } catch (error) {
      console.error('Problemas con los comentarios');
    };
  };
};

export const startEnviarComentario = (body)=>{
  return async dispatch =>{
    try {
      const res = await fetch('post', `${_URL_DEV}/Comentarios`, body);
      if (res.ok) {
        console.log('Comentario Agregado');
      };
    } catch (error) {
      console.log(error);
    };
  };
};