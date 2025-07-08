import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
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
} = registerSlice.actions;