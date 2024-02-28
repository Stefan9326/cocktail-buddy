import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useFetchResults } from "./hooks/useFetchResults";
import IngredientDropdown from "./components/IngredientDropdown/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";
import { useFetchIngredients } from "./hooks/useFetchIngredients";

function App() {
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);
  const { results, resultsSuccess } = useFetchResults(dropdowns);
  const { ingredientsList } = useFetchIngredients();

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
      {results.length > 0 && resultsSuccess && (
        <>
          <ResultsContainer
            results={results.map((result) => result.data)}
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
