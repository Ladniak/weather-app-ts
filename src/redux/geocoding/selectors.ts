import type { RootState } from "../store";

export const selectCoordinates = (state: RootState) =>
  state.weatherByCity.coordinates;
export const selectWeatherLoading = (state: RootState) =>
  state.weatherByCity.loading;
export const selectWeatherError = (state: RootState) =>
  state.weatherByCity.error;
export const selectCityName = (state: RootState) =>
  state.weatherByCity.cityName;
