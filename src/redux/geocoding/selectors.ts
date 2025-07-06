import type { RootState } from "../store";

export const selectWeatherByCity = (state: RootState) =>
  state.weatherByCity.current;
export const selectWeatherLoading = (state: RootState) =>
  state.weatherByCity.loading;
export const selectWeatherError = (state: RootState) =>
  state.weatherByCity.error;
