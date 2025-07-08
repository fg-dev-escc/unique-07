import { createSlice } from '@reduxjs/toolkit';

export const auctionSlice = createSlice({
    name: 'auction',
    initialState: {
      subastaTorres:{},
      subastaTorre:{},
      pujaMartillo:{},
      pujaMayor:{
        monto:0, 
        usuario:''
      },
      comentarios:[],
      imgPrincipal:'',
      fechaFin:0,
      loading:false,
      loadingPuja: false,
      errorPuja: null,
      pujas: [],
      tiempoRestante: null
    },
    reducers: {
      setSubastaTorres: (state, {payload}) => {
        state.subastaTorres = payload;
      },
      setSubastaTorre: (state, {payload}) => {
        state.subastaTorre = payload;
        state.imgPrincipal = payload.urlImgPrincipal;
      },
      setPujaMartillo:(state, {payload}) => {
        state.pujaMartillo = payload;
      },
      setPujaMayor:(state, {payload}) =>{
        state.pujaMayor.monto = payload.monto;
        state.pujaMayor.usuario = payload.usuario;
      },
      setTorreComentarios:(state, {payload}) => {
        state.comentarios = payload;
      },
      setFechaFin:(state, {payload}) => {
        state.fechaFin = payload;
      },      
      setImagenPrincipal:(state, {payload})=>{
        state.imgPrincipal = payload;
      },
      setLoading:(state, {payload}) =>{
        state.loading = payload;
      },
      setLoadingPuja: (state, { payload }) => {
        state.loadingPuja = payload;
      },
      setErrorPuja: (state, { payload }) => {
        state.errorPuja = payload;
      },
      setPujas: (state, { payload }) => {
        state.pujas = payload;
      },
      setTiempoRestante: (state, { payload }) => {
        state.tiempoRestante = payload;
      },
      addPuja: (state, { payload }) => {
        state.pujas.unshift(payload);
        if (state.pujas.length > 10) {
          state.pujas = state.pujas.slice(0, 10);
        }
      },
      clearAuctionData: (state) => {
        state.subastaTorre = {};
        state.pujaMayor = { monto: 0, usuario: '' };
        state.fechaFin = 0;
        state.comentarios = [];
        state.pujas = [];
        state.errorPuja = null;
        state.tiempoRestante = null;
      }
    }
});


// Action creators are generated for each case reducer function
export const { 
  setSubastaTorres, 
  setSubastaTorre, 
  setPujaMartillo, 
  setPujaMayor, 
  setTorreComentarios, 
  setFechaFin, 
  setImagenPrincipal, 
  setLoading,
  setLoadingPuja,
  setErrorPuja,
  setPujas,
  setTiempoRestante,
  addPuja,
  clearAuctionData
} = auctionSlice.actions;
