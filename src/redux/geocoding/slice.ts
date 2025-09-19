import { createSlice } from "@reduxjs/toolkit";
import { fetchCityNameByCoords, fetchWeatherByCity } from "./operations";

type WeatherByCityState = {
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  cityName: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: WeatherByCityState = {
  coordinates: null,
  cityName: null,
  loading: false,
  error: null,
};

const weatherByCitySlice = createSlice({
  name: "weatherByCity",
  initialState,
  reducers: {
    clearState(state) {
      state.coordinates = null;
      state.cityName = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.coordinates = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      .addCase(fetchCityNameByCoords.fulfilled, (state, action) => {
        state.cityName = action.payload;
      })
      .addCase(fetchCityNameByCoords.rejected, (state, action) => {
        state.cityName = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearState } = weatherByCitySlice.actions;
export default weatherByCitySlice.reducer;

