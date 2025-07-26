import type { RootState } from "../store";

export const selectWeatherCurrent = (state: RootState) => state.weather.current;
export const selectWeatherTemperature = (state: RootState) =>
  state.weather.current?.temperature ?? null;
export const selectWeatherWindspeed = (state: RootState) =>
  state.weather.current?.windspeed ?? null;
export const selectWeatherCode = (state: RootState) =>
  state.weather.current?.weathercode ?? null;

export const selectWeatherDaily = (state: RootState) => state.weather.daily;
export const selectWeatherHourly = (state: RootState) => state.weather.hourly;

export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;
