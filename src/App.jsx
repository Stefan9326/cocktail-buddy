import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";

function App() {
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div className="App">
      <SearchBar
        setResults={setResults}
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
