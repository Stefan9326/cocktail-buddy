import { useState, createContext } from "react";
import { useFetchCocktailsByIngredients, useFetchData } from "@hooks";
import { fetchData } from "@utils";
import { v4 as uuidv4 } from "uuid";
import { IngredientSearchResults, DropdownsContainer } from "@components";

export const IngredientSearchContext = createContext();

const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

export const IngredientSearch = () => {
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const { results, resultsSuccess } = useFetchCocktailsByIngredients(dropdowns);
  const { results: ingredientsList } = useFetchData(["ingredients"], () => fetchData(url));

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <IngredientSearchContext.Provider value={{ dropdowns, setDropdowns, ingredientsList }}>
      <div>
        <DropdownsContainer />
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
    </IngredientSearchContext.Provider>
  );
};
