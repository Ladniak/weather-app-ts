import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        return rejectWithValue("City not found");
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      return weatherData.current_weather;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch weather");
    }
  }
);
