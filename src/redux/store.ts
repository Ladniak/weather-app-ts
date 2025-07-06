import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/slice";
import cityWeatherReducer from "./geocoding/slice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weatherByCity: cityWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
