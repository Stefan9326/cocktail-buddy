import { useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { fetchIngredientsList } from "./api";
import IngredientDropdown from "./components/SearchBar/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";

function App() {
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);

  // Fetch ingredients list
  const { data: ingredientsList } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredientsList,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const queryResults = useQueries({
    queries: dropdowns
      .filter((dropdown) => dropdown.value)
      .map((ingredient) => {
        return {
          queryKey: ["results", ingredient],
          queryFn: () => {
            return Axios.get(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.value}`
            );
          },
          enabled: !!ingredient.value,
        };
      }),
  });
  queryResults.forEach((result) => {
    if (result.isSuccess) console.log(result.data.data);
  });

  const resultsSuccess = queryResults.every((result) => result.isSuccess);

  // const handleSearchClick = () => {
  //   console.log(dropdowns);
  //   setResultsDisplayLimit(10);
  //   fetchResults();
  // };

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
    ingredientsList && (
      <div className="App">
        {ingredientsList &&
          dropdowns.map((dropdown) => (
            <IngredientDropdown
              key={dropdown.id}
              id={dropdown.id}
              updateDropdownValue={updateDropdownValue}
              ingredients={ingredientsList}
            />
          ))}
        {dropdowns[0].value && (
          <>
            <button id="add-ingr-btn" onClick={addIngredient}>
              Add ingredient
            </button>
          </>
        )}
        {queryResults.length > 0 && resultsSuccess && (
          <>
            <ResultsContainer
              results={queryResults.map((result) => result.data.data.drinks)}
              resultsLimit={resultsDisplayLimit}
              dropdowns={dropdowns}
            />
            <button onClick={showMoreResults}>Show more</button>
          </>
        )}
      </div>
    )
  );
}

export default App;
