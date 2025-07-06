import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByCity } from "./operations";

type WeatherByCityState = {
  current: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: WeatherByCityState = {
  current: null,
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
        state.current = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default weatherByCitySlice.reducer;
