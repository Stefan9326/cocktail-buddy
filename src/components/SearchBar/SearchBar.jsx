import { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ setResults, setResultsDisplayLimit }) => {
  const [inputValue, setInputValue] = useState("");

  const fetchResults = async () => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`
      );
      console.log(response);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setResultsDisplayLimit(10);
    fetchResults();
  };

  return (
    <div className="search-bar">
      <form action="get">
        <input value={inputValue} onChange={handleChange} type="text" />
        <button onClick={handleClick}>Search</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
  setResultsDisplayLimit: PropTypes.func.isRequired,
};

export default SearchBar;
