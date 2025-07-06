import type { RootState } from "../store";

export const selectWeatherCurrent = (state: RootState) => state.weather.current;

export const selectWeatherTemperature = (state: RootState) =>
  state.weather.current?.temperature ?? null;

export const selectWeatherWindspeed = (state: RootState) =>
  state.weather.current?.windspeed ?? null;

export const selectWeatherLoading = (state: RootState) => state.weather.loading;

export const selectWeatherError = (state: RootState) => state.weather.error;
