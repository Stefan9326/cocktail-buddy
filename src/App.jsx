import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import IngredientDropdown from "./components/SearchBar/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  // Necessary to keep track of the selected ingredient for each dropdown and change dropdownValues accordingly
  const [dropdownIds, setDropdownIds] = useState([1]);
  // Values of the dropdowns, used to fetch the results
  const [dropdownValues, setDropdownValues] = useState({});

  // Fetch ingredients list
  const { data } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      try {
        const response = await Axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
        );
        return response.data.drinks;
      } catch (error) {
        throw error(error);
      }
    },
    staleTime: Infinity,
  });
  console.log(data);

  // This will be replaced by useQueries hook below
  const fetchResults = async () => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${dropdownValues[1]}`
      );
      console.log(response);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  // This needs to be finished. It first fetches results based on ingredients selected.
  // I think this needs to be moved into the handleSearchClick function so that it only executes onClick.
  // const queryResults = useQueries({
  //   queries: Object.values(dropdownValues).map((ingredient) => {
  //     return {
  //       queryKey: ["results", ingredient],
  //       queryFn: () => {
  //         return Axios.get(
  //           `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  //         );
  //       },
  //     };
  //   }),
  // });

  const handleSearchClick = () => {
    console.log(dropdownValues);
    setResultsDisplayLimit(10);
    fetchResults();
  };

  const addIngredient = () => {
    setDropdownIds([...dropdownIds, dropdownIds.length + 1]);
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    data && (
      <div className="App">
        {dropdownIds.map((id) => (
          <IngredientDropdown
            key={id}
            id={id}
            dropdownValues={dropdownValues}
            setDropdownValues={setDropdownValues}
            data={data}
          />
        ))}
        <button id="add-ingr-btn" onClick={addIngredient}>
          Add ingredient
        </button>
        <button id="search-btn" onClick={handleSearchClick}>
          Search
        </button>
        <ResultsContainer
          results={results}
          resultsLimit={resultsDisplayLimit}
        />
        {results && results.length > 0 && (
          <button onClick={showMoreResults}>Show more</button>
        )}
      </div>
    )
  );
}

export default App;
