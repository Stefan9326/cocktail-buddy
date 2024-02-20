import Axios from "axios";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";

function App() {
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);

  const fetchResults = async (query) => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`
      );
      console.log(response);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div className="App">
      <SearchBar
        fetchResults={fetchResults}
        setResultsDisplayLimit={setResultsDisplayLimit}
      />
      <ResultsContainer results={results} resultsLimit={resultsDisplayLimit} />
      {results && results.length > 0 && (
        <button onClick={showMoreResults}>Show more</button>
      )}
    </div>
  );
}

export default App;
