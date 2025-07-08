import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
      loading:false,
    },
    reducers: {
      setLoading:(state, {payload})=>{
        state.loading = payload;
      }
    }
});


// Action creators are generated for each case reducer function
export const { setLoading } = loaderSlice.actions;
