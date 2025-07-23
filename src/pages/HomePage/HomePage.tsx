import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weather/operations";
import type { AppDispatch } from "../../redux/store";
import { selectWeatherCurrent } from "../../redux/weather/selectors";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(selectWeatherCurrent);
  const [searchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  useEffect(() => {
    if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
      dispatch(fetchWeather({ latitude: lat, longitude: lon }));
    }
  }, [dispatch, lat, lon]);

  const formattedDate = selector?.time
    ? new Date(selector.time + "Z").toLocaleDateString()
    : "";

  return (
    <div className="flex justify-center ">
      <div className="rounded-lg py-6 pl-8 pr-32 bg-blue-400 opacity-90 text-white">
        Block1
      </div>
      <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg">
        Block2
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
