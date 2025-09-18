import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weather/operations";
import type { AppDispatch } from "../../redux/store";
import {
  selectWeatherCode,
  selectWeatherCurrent,
  selectWeatherDaily,
} from "../../redux/weather/selectors";
import { useSearchParams } from "react-router-dom";
import { selectCityName } from "../../redux/geocoding/selectors";
import { fetchCityNameByCoords } from "../../redux/geocoding/operations";

import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";
import { getIconIdFromWeatherCode } from "../../utils/getIconIdFromWeatherCode";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector(selectWeatherCurrent);
  const weatherHourly = useSelector(selectWeatherDaily);
  const weatherCode = useSelector(selectWeatherCode);
  const cityName = useSelector(selectCityName);

  const [searchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  const selectorTime = weather?.time ?? "";

  let iconId = null;
  if (weatherCode !== null) {
    iconId = getIconIdFromWeatherCode(weatherCode);
  }

  useEffect(() => {
    if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
      dispatch(fetchWeather({ latitude: lat, longitude: lon }));
      dispatch(fetchCityNameByCoords({ latitude: lat, longitude: lon }));
    }
  }, [dispatch, lat, lon]);

  console.log(weatherHourly);

  const formatWeatherDate = (
    timeStr: string
  ): { dayName: string; dateStr: string } => {
    const date = new Date(timeStr + "Z");

    const dayName = date.toLocaleDateString("en-GB", {
      weekday: "long",
    });

    const dateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

    return { dayName, dateStr };
  };

  const { dayName, dateStr } = formatWeatherDate(selectorTime);

  console.log(weather);

  return (
   <div className="flex justify-center min-h-screen items-center">
  <div className="flex justify-center">
    <div className="flex flex-col w-[640px] rounded-lg py-6 pl-8 pr-32 bg-blue-400 opacity-90 text-white gap-20">
      <div>
        <h1 className="text-4xl font-bold">{dayName}</h1>
        <p className="flex pl-1">{dateStr}</p>
        <p className="flex items-center">
          <svg
            className="h-5"
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="#cfcfcf"
          >
            <path d="M16,3C10.5,3,6,7.5,6,13c0,8.4,9,15.5,9.4,15.8c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2C17,28.5,26,21.4,26,13 C26,7.5,21.5,3,16,3z M16,17c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S18.2,17,16,17z"></path>
          </svg>
          <span className="text-gray-100">{cityName}</span>
        </p>
      </div>
      <div>
        {iconId !== null && <WeatherIcon iconId={iconId} />}
        <p className="text-5xl font-bold">{weather?.temperature}°С</p>
      </div>
    </div>
    <div className="w-[640px] lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg">
      <div className="flex flex-col gap-[25px]">
        <div className="flex justify-between">
          <p className="uppercase font-bold">Precipitation</p>
          <p>{weatherHourly?.precipitation_sum?.[0]} mm</p>
        </div>
        <div className="flex justify-between">
          <p className="uppercase font-bold">Humidity</p>
          <p>{weatherHourly?.relative_humidity_2m_avg?.[0]} %</p>
        </div>
        <div className="flex justify-between">
          <p className="uppercase font-bold">Wind</p>
          <p>{weather?.windspeed} Mph</p>
        </div>       
      </div>
      <div className="w-full mt-8">
        <div className="flex justify-between gap-4">
          {weatherHourly?.time.slice(1, 5).map((date, index) => {
            const { dayName } = formatWeatherDate(date);
            const iconId = getIconIdFromWeatherCode(weatherHourly.weathercode[index + 1]);
            const minTemp = weatherHourly.temperature_2m_min[index + 1];
            const maxTemp = weatherHourly.temperature_2m_max[index + 1];

            return (
              <div
                key={date}
                className="bg-gray-700 text-white rounded-lg flex flex-col items-center justify-center p-2 text-center"
                style={{ width: "132px", height: "150px" }}
              >
                <p className="font-bold text-sm">{dayName}</p>
                <WeatherIcon iconId={iconId} />
                <p className="mt-1 text-sm">
                  {minTemp}°C / {maxTemp}°C
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default HomePage;

