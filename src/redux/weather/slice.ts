import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./operations";

type WeatherState = {
  current: {
    temperature: number;
    windspeed: number;
    weathercode: number | null;
    time: string;
  } | null;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    precipitation_sum: number[];
    windspeed_10m_max: number[];
    relative_humidity_2m_max: number[];
    relative_humidity_2m_min: number[];
    relative_humidity_2m_avg: number[];
  } | null;
  loading: boolean;
  error: string | null;
};


const initialState: WeatherState = {
  current: null,
  daily: null,
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
      builder.addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;

        if (action.payload.daily) {
          const daily = action.payload.daily;
          const relative_humidity_2m_avg = daily.relative_humidity_2m_max.map(
            (max: number, index: number) => {
              const min = daily.relative_humidity_2m_min[index];
              return Math.round((max + min) / 2);
            }
          );
          state.daily = {
            ...daily,
            relative_humidity_2m_avg,
          };
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
