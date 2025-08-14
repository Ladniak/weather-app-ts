import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weather/operations";
import type { AppDispatch } from "../../redux/store";
import {
  selectWeatherCode,
  selectWeatherCurrent,
} from "../../redux/weather/selectors";
import { useSearchParams } from "react-router-dom";
import { selectCityName } from "../../redux/geocoding/selectors";
import { fetchCityNameByCoords } from "../../redux/geocoding/operations";

import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";
import { getIconIdFromWeatherCode } from "../../utils/getIconIdFromWeatherCode";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(selectWeatherCurrent);
  const [searchParams] = useSearchParams();
  const cityName = useSelector(selectCityName);
  const selectorTime = selector?.time ?? "";

  const weatherCode = useSelector(selectWeatherCode);
  const iconId = getIconIdFromWeatherCode(weatherCode);

  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  useEffect(() => {
    if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
      dispatch(fetchWeather({ latitude: lat, longitude: lon }));
      dispatch(fetchCityNameByCoords({ latitude: lat, longitude: lon }));
    }
  }, [dispatch, lat, lon]);

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

  console.log(selector);

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="flex justify-center min-w-full ">
        <div className="flex flex-col rounded-lg py-6 pl-8 pr-32 bg-blue-400 opacity-90 text-white gap-20">
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
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css">
                    {" "}
                    .st0
                    fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;{" "}
                  </style>{" "}
                  <path d="M16,3C10.5,3,6,7.5,6,13c0,8.4,9,15.5,9.4,15.8c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2C17,28.5,26,21.4,26,13 C26,7.5,21.5,3,16,3z M16,17c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S18.2,17,16,17z"></path>{" "}
                </g>
              </svg>{" "}
              <span className="text-gray-100">{cityName}</span>
            </p>
          </div>
          <div>
            <WeatherIcon iconId={iconId} />
            temperature
          </div>
        </div>
        <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg">
          Block2
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <p>{selector?.temperature}</p>
<p>{selector?.windspeed}</p>
<p>{formattedDate}</p> */
}
