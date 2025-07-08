import { createSlice } from '@reduxjs/toolkit';

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
      loading:false,
      nuevoUsuario: {},
      respuestaForm:null
    },
    reducers: {
      setLoading:(state, {payload}) => {
        state.loading = payload;
      },
      setNuevoUsuario:(state, {payload}) => {
        state.nuevoUsuario = payload;
      },
      setRespuestaForm:(state, {payload}) => {
        state.respuestaForm = payload;
      },
    },
});


// Action creators are generated for each case reducer function
export const { setLoading, setNuevoUsuario, setRespuestaForm } = onboardingSlice.actions;
