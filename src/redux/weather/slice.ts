import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./operations";

type WeatherState = {
  current: {
    temperature: number;
    windspeed: number;
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: WeatherState = {
  current: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
