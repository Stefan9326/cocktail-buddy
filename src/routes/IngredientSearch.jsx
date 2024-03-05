import { useState } from "react";
import useFetchResults from "../hooks/useFetchResults";
import useDropdowns from "../hooks/useDropdowns";
import { fetchIngredientsList } from "../utils/api";
import useFetchData from "../hooks/useFetchData";
import IngredientDropdown from "../components/IngredientDropdown/IngredientDropdown";
import IngredientSearchResults from "../components/IngredientSearchResults/IngredientSearchResults";

const IngredientSearch = () => {
  const { results: ingredientsList } = useFetchData(["ingredients"], fetchIngredientsList);
  const { dropdowns, addIngredient, updateDropdownValue } = useDropdowns();
  const { results, resultsSuccess } = useFetchResults(dropdowns);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div>
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
          <IngredientSearchResults
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
