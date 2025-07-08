import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/auth/userSlice";
import { modalSlice } from "./shared/modalSlice";
import { registerSlice } from "./features/auth/registerSlice";
import { slideshowSlice } from "./shared/slideshowSlice";
import { auctionSlice } from "./features/auction/auctionSlice";
import { loaderSlice } from "./shared/loaderSlice";
import { searchSlice } from "./features/search/searchSlice";
import { sellSlice } from "./features/sell/sellSlice";
import { homeSlice } from "./features/home/homeSlice";


export const store = configureStore({
    reducer: {
      userReducer: userSlice.reducer,
      modalReducer: modalSlice.reducer,
      registerReducer: registerSlice.reducer,
      slideshowReducer: slideshowSlice.reducer,
      auctionReducer: auctionSlice.reducer,
      searchReducer: searchSlice.reducer,
      sellReducer: sellSlice.reducer,
      homeReducer: homeSlice.reducer,
      loaderReducer:loaderSlice.reducer
    },
  });
  