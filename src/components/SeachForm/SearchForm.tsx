import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchWeatherByCity } from "../../redux/geocoding/operations";
import { useState, type ChangeEvent } from "react";
import { selectCoordinates } from "../../redux/geocoding/selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coord = useSelector(selectCoordinates);
  const navigate = useNavigate();

  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setError(null); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (city.trim() === "") {
      setError("Please enter city name");
      return;
    }

    try {
      const result = await dispatch(fetchWeatherByCity(city)).unwrap();

      if (!result || !result.latitude || !result.longitude) {
        setError("Please enter true name of city");
      }
    } catch (e) {
      setError("Please enter true name of city");
    }
  };

  useEffect(() => {
    if (coord != null) {
      navigate(`/weather?lat=${coord.latitude}&lon=${coord.longitude}`);
    }
  }, [coord, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 pr-[50px] pl-[50px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full mx-10 rounded bg-white"
      >
        <input
          className=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none"
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Search city"
        />
        <button
          type="submit"
          className="m-2 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-500"
        >
          <svg
            className="fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </form>

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SearchForm;

