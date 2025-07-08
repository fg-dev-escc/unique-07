import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    carsByScope: {}, // { [scope]: { featuredCars, loading, error, pagination } }
    searchQuery: '',
    sortBy: '1',
  },
  reducers: {
    setLoading: (state, { payload }) => {
      const { scope, loading } = payload;
      if (!state.carsByScope[scope]) state.carsByScope[scope] = {};
      state.carsByScope[scope].loading = loading;
    },
    setFeaturedCars: (state, { payload }) => {
      const { scope, cars, pagination } = payload;
      if (!state.carsByScope[scope]) state.carsByScope[scope] = {};
      state.carsByScope[scope].featuredCars = cars;
      if (pagination) state.carsByScope[scope].pagination = pagination;
    },
    setError: (state, { payload }) => {
      const { scope, error } = payload;
      if (!state.carsByScope[scope]) state.carsByScope[scope] = {};
      state.carsByScope[scope].error = error;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortBy = payload;
    },
    clearError: (state, { payload }) => {
      const { scope } = payload;
      if (state.carsByScope[scope]) state.carsByScope[scope].error = null;
    }
  }
});

export const {
  setLoading,
  setFeaturedCars,
  setError,
  setSearchQuery,
  setSortBy,
  clearError
} = homeSlice.actions;