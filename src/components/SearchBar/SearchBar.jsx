import "./SearchBar.css";
import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ fetchResults }) => {
  // component code here

  SearchBar.propTypes = {
    fetchResults: PropTypes.func.isRequired,
  };
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
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

export default SearchBar;
