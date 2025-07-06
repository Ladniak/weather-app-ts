import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchWeatherByCity } from "../../redux/geocoding/operations";
import { useState, type ChangeEvent } from "react";
import { selectCoordinates } from "../../redux/geocoding/selectors";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coord = useSelector(selectCoordinates);
  const navigate = useNavigate();

  const [city, setCity] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (city != "") {
      dispatch(fetchWeatherByCity(city));
    } else {
      console.log("Enter some city!");
    }
  };

  if (coord != null) {
    navigate(`/weather?lat=${coord.latitude}&lon=${coord.longitude}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
