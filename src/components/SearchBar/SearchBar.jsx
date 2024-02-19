import "./SearchBar.css";
import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ fetchResults, setResultsDisplayLimit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setResultsDisplayLimit(10);
    fetchResults(inputValue);
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
  fetchResults: PropTypes.func.isRequired,
  setResultsDisplayLimit: PropTypes.func.isRequired,
};

export default SearchBar;
