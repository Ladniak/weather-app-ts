import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherByCity = createAsyncThunk(
  "geocoding/fetchWeatherByCity",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const geoRes = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: cityName,
          },
        }
      );

      const geoData = geoRes.data;

      if (!geoData.results || geoData.results.length === 0) {
        return rejectWithValue("City not found");
      }

      const { latitude, longitude } = geoData.results[0];

      return { latitude, longitude };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch coordinates");
    }
  }
);

export const fetchCityNameByCoords = createAsyncThunk(
  "weatherByCity/fetchCityNameByCoords",
  async (
    { latitude, longitude }: { latitude: number; longitude: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
          },
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      const address = response.data.address;
      const city =
        address.city || address.town || address.village || address.hamlet;

      if (!city) {
        return rejectWithValue("No city found in address");
      }

      return `${city}, ${address.country}`;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch city");
    }
  }
);
