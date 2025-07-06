import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";
import { fetchWeatherByCity } from "../../redux/geocoding/operations";
import { useEffect } from "react";
import { selectWeatherByCity } from "../../redux/geocoding/selectors";

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(selectWeatherByCity);

  useEffect(() => {
    dispatch(fetchWeatherByCity("Netishyn"));
  }, [dispatch]);

  console.log(selector);

  return (
    <div>
      <input type="text" />
      <Link to="/weather">Search</Link>
    </div>
  );
};

export default SearchForm;
