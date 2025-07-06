import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherByCity = createAsyncThunk(
  "geocoding/fetchWeatherByCity",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        return rejectWithValue("City not found");
      }

      const { latitude, longitude } = geoData.results[0];

      // Повертаємо тільки координати
      return { latitude, longitude };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch coordinates");
    }
  }
);
