import { useState } from "react";
import useFetchResults from "../hooks/useFetchResults";
import useDropdowns from "../hooks/useDropdowns";
import useFetchIngredients from "../hooks/useFetchIngredients";
import IngredientDropdown from "../components/IngredientDropdown/IngredientDropdown";
import ResultsContainer from "../components/ResultsContainer/ResultsContainer";
import "../App.css";

const IngredientSearch = () => {
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const { dropdowns, addIngredient, updateDropdownValue } = useDropdowns();
  const { results, resultsSuccess } = useFetchResults(dropdowns);
  const { ingredientsList } = useFetchIngredients();

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div className="App">
      <img src="src/assets/3-cropped.webp" alt="" width="460px" />
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
};

export default IngredientSearch;