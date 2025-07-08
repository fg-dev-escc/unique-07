import { createSlice } from '@reduxjs/toolkit';

export const slideshowSlice = createSlice({
    name: 'slideshow',
    initialState: {
      slideCars:[],
      gridCars: [],
      loading:false
    },
    reducers: {
      setCars: (state, {payload}) => {
        state.slideCars = payload;
      },
      setGridCars: (state, {payload}) => {
        state.gridCars = payload;
      },
      setLoading:(state, {payload})=>{
        state.loading = payload;
      }
    }
});


// Action creators are generated for each case reducer function
export const { setCars, setGridCars, setLoading } = slideshowSlice.actions;
