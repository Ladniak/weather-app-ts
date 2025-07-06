import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByCity } from "./operations";

type WeatherByCityState = {
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: WeatherByCityState = {
  coordinates: null,
  loading: false,
  error: null,
};

const weatherByCitySlice = createSlice({
  name: "weatherByCity",
  initialState,
  reducers: {},
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
      });
  },
});

export default weatherByCitySlice.reducer;
