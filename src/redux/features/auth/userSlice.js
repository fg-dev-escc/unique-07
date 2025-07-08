import { createSlice } from "@reduxjs/toolkit";
import { consLogged } from "../../../const/consLogged";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    logged: consLogged.NOTLOGGED, // Cambiado de STARTING a NOTLOGGED
    loginErr: null,
    loadingLogin: false,
    user: {
      nombre: "User",
      email: "",
      usuarioID: "",
    },
    responseReg:null
  },
  reducers: {
    setLoginErr: (state, action) => {
      state.loginErr = action.payload;
      state.loadingLogin = false;
    },
    setLoadingLogin: (state, action) => {
      state.loadingLogin = action.payload !== undefined ? action.payload : true;
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    storeUser: (state, { payload }) => {
      state.user = payload;
      state.loadingLogin = false;
      state.logged = consLogged.LOGGED;
    },
    logOut: (state) => {
      state.user = null;
      state.logged = consLogged.NOTLOGGED;
      state.loginErr = null;
      state.loadingLogin = false;
    },
    setResponseReg:(state,{payload})=>{
      state.responseReg = payload;
    }
  },
});

export const {
  setLoginErr,
  setLoadingLogin,
  setLogged,
  storeUser,
  logOut,
  setResponseReg
} = userSlice.actions;

export default userSlice.reducer;
