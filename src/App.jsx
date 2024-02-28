import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import IngredientDropdown from "./components/IngredientDropdown/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";
import { useFetchIngredients } from "./hooks/useFetchIngredients";

function App() {
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);
  const { ingredientsList } = useFetchIngredients();

  // Fetch ingredients list

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
  const resultsSuccess = queryResults.every((result) => result.isSuccess);

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
  );
}

export default App;
