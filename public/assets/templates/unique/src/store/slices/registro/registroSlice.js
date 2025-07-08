import { createSlice } from "@reduxjs/toolkit";

export const registroSlice = createSlice({
  name: "registro",
  initialState: {
    registroRespuesta:null,
    registroError:null
  },
  reducers: {
    setRegistroRespuesta:(state, {payload})=>{
      state.registroRespuesta = payload;
    },
    setRegistroError:(state, {payload})=>{
      state.registroError = payload;
    },
    setRegistroNull:(state, {payload})=>{
      state.registroError = null;
      state.registroRespuesta = null;
    }
  },
});

export const {
  setRegistroRespuesta,
  setRegistroNull,
  setRegistroError
} = registroSlice.actions;