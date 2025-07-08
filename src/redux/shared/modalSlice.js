import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalLogin:false,
    modalRegistro:false,
    modalToken:false,
    modalMenu:false,
  },
  reducers: {
    setModalLogin: (state, {payload}) => {
      state.modalLogin = payload;
    },
    setModalRegistro: (state, {payload}) => {
      state.modalRegistro = payload;
    },
    setModalToken: (state, {payload}) => {
      state.modalToken = payload;
    },
    setModalMenu:(state, {payload}) => {
      state.modalMenu = payload;
    }
  },
});

export const {
  setModalLogin,
  setModalRegistro,
  setModalToken
} = modalSlice.actions;
