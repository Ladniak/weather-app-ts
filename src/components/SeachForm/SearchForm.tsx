import { Link } from "react-router-dom";

const SearchForm = () => {
  return (
    <div>
      <input type="text" />
      <Link to="/weather">Search</Link>
    </div>
  );
};

export default SearchForm;
