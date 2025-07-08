import { createSlice } from '@reduxjs/toolkit';

export const subastaSlice = createSlice({
    name: 'subasta',
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
      loading:false
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
      }
    }
});


// Action creators are generated for each case reducer function
export const { setSubastaTorres, setSubastaTorre, setPujaMartillo, setPujaMayor, setTorreComentarios, setFechaFin, setImagenPrincipal, setLoading } = subastaSlice.actions;
