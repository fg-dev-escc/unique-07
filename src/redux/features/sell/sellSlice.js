import { createSlice } from '@reduxjs/toolkit';

export const sellSlice = createSlice({
    name: 'sell',
    initialState: {
      loading:false,
      respuesta:{
        success:null,
        usuarioID:null,
        clienteID:null
      },
      formulario:{}
    },
    reducers: {
      setLoading:(state, {payload}) => {
        state.loading = payload;
      },
      setRespuesta: (state, {payload} ) => {
          state.respuesta = payload
      },
      setFormulario:(state, {payload}) => {
        state.formulario = payload;
      },
    }
});


// Action creators are generated for each case reducer function
export const { setLoading, setRespuesta, setFormulario } = sellSlice.actions;
