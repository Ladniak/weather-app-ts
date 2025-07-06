import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weather/operations";
import type { AppDispatch } from "../../redux/store";
import { selectWeatherCurrent } from "../../redux/weather/selectors";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(selectWeatherCurrent);

  useEffect(() => {
    dispatch(fetchWeather({ latitude: 50.45, longitude: 30.52 }));
  }, [dispatch]);

  console.log(selector);

  return <div>HomePage</div>;
};

export default HomePage;
