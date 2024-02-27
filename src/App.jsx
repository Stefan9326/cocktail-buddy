import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { fetchIngredientsList } from "./api";
import IngredientDropdown from "./components/SearchBar/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);

  // Fetch ingredients list
  const { data } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredientsList,
    staleTime: Infinity,
  });

  // This will be replaced by useQueries hook below
  const fetchResults = async () => {
    try {
      const responses = await Promise.all(
        dropdowns
          .filter((dropdown) => dropdown.value)
          .map((dropdown) => {
            return Axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${dropdown.value}`
            );
          })
      );
      console.log(responses);
      setResults(responses.map((result) => result.data.drinks));
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
    console.log(dropdowns);
    setResultsDisplayLimit(10);
    fetchResults();
  };

  const addIngredient = () => {
    setDropdowns([...dropdowns, { id: uuidv4(), value: "" }]);
  };

  const updateDropdownValue = (id, value) => {
    setDropdowns(
      dropdowns.map((dropdown) => {
        if (dropdown.id === id) {
          return { ...dropdown, value };
        }
        return dropdown;
      })
    );
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    data && (
      <div className="App">
        {data &&
          dropdowns.map((dropdown) => (
            <IngredientDropdown
              key={dropdown.id}
              id={dropdown.id}
              updateDropdownValue={updateDropdownValue}
              ingredients={data}
            />
          ))}
        {dropdowns[0].value && (
          <>
            <button id="add-ingr-btn" onClick={addIngredient}>
              Add ingredient
            </button>
            <button id="search-btn" onClick={handleSearchClick}>
              Search
            </button>
          </>
        )}
        {results.length > 0 && (
          <>
            <ResultsContainer
              results={results}
              resultsLimit={resultsDisplayLimit}
            />
            <button onClick={showMoreResults}>Show more</button>
          </>
        )}
      </div>
    )
  );
}

export default App;
