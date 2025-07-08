import { createSlice } from "@reduxjs/toolkit";

export const busquedaSlice = createSlice({
  name: "busqueda",
  initialState: {
    resultado:[],
    texto:{},
    paginacion:{},
    loadig:false,
  },
  reducers: {
    setTexto:(state, {payload}) => {
      state.texto = payload;
    },    
    setResultadoBusqueda: (state, {payload}) => {
      state.resultado = payload.datos;
      state.paginacion = payload.paginacion;
    },
    setLoading:(state, {payload}) => {
      state.loadig = payload;
    }
  },
});

export const { setTexto, setResultadoBusqueda, setLoading }= busquedaSlice.actions;