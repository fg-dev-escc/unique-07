import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/auth/userSlice";
import { modalSlice } from "./slices/modal/modalSlice";
import { registroSlice } from "./slices/registro/registroSlice";
import { slideshowSlice } from "./slices/slideshow/slideshowSlice";
import { subastaSlice } from "./slices/subastaSlice/subastaSlice";
import { loaderSlice } from "./slices/loader/loaderSlice";
import { busquedaSlice } from "./slices/busqueda/busquedaSlice";
import { vendedorSlice } from "./slices/vender/venderSlide";


export const store = configureStore({
    reducer: {
      userReducer: userSlice.reducer,
      modalReducer: modalSlice.reducer,
      registroReducer: registroSlice.reducer,
      slideshowReducer: slideshowSlice.reducer,
      subastaReducer: subastaSlice.reducer,
      busquedaReducer: busquedaSlice.reducer,
      vendedorReducer:vendedorSlice.reducer,
      loaderReducer:loaderSlice.reducer
    },
  });
  