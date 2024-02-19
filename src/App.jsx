import Axios from "axios";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";

function App() {
  const [results, setResults] = useState([]);

  const fetchResults = async (query) => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`
      );
      console.log(response.data.drinks);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <SearchBar fetchResults={fetchResults} />
      <ResultsContainer results={results} />
    </div>
  );
}

export default App;
