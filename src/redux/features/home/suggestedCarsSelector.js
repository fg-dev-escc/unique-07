import { createSelector } from 'reselect';

const selectFeaturedCars = state => state.homeReducer.carsByScope?.main?.featuredCars || [];

export const selectSuggestedCars = createSelector(
  [selectFeaturedCars, (state, id) => id],
  (featuredCars, id) =>
    featuredCars.filter(car => String(car.torreID) !== String(id)).slice(0, 3)
);
