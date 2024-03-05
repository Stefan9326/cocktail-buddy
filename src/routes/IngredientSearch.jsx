import { useState } from "react";
import useFetchCocktailsByIngredients from "../hooks/useFetchCocktailsByIngredients";
import useDropdowns from "../hooks/useDropdowns";
import { fetchData } from "../utils/api";
import useFetchData from "../hooks/useFetchData";
import IngredientDropdown from "../components/IngredientDropdown/IngredientDropdown";
import IngredientSearchResults from "../components/IngredientSearchResults/IngredientSearchResults";

const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

const IngredientSearch = () => {
  const { results: ingredientsList } = useFetchData(["ingredients"], () => fetchData(url));
  const { dropdowns, addDropdown, updateDropdownValue, deleteDropdown } = useDropdowns();
  const { results, resultsSuccess } = useFetchCocktailsByIngredients(dropdowns);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div>
      {ingredientsList &&
        dropdowns.map((dropdown) => (
          <div key={dropdown.id}>
            <IngredientDropdown
              id={dropdown.id}
              updateDropdownValue={updateDropdownValue}
              ingredients={ingredientsList}
            />
            {dropdowns.length > 1 && <button onClick={() => deleteDropdown(dropdown.id)}>Delete</button>}
          </div>
        ))}
      {dropdowns[0].value && (
        <>
          <button id="add-ingr-btn" onClick={addDropdown}>
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
