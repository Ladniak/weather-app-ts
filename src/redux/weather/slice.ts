import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./operations";

type WeatherState = {
  current: {
    temperature: number;
    windspeed: number;
    time: string;
  } | null;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  } | null;
  hourly: {
    time: string[];
    relative_humidity_2m: number[];
    precipitation: number[];
    windspeed_10m: number[];
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: WeatherState = {
  current: null,
  daily: null,
  hourly: null,
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
        state.current = action.payload.current;
        state.daily = action.payload.daily;
        state.hourly = action.payload.hourly;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
