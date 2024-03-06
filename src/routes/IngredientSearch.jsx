import { useState, createContext } from "react";
import { useFetchCocktailsByIngredients, useFetchData } from "@hooks";
import { fetchData } from "@utils";
import { v4 as uuidv4 } from "uuid";
import { IngredientSearchResults, DropdownsContainer } from "@components";

export const IngredientSearchContext = createContext();

const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

export const IngredientSearch = () => {
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);
  const { results, resultsSuccess } = useFetchCocktailsByIngredients(dropdowns);
  const { results: ingredientsList } = useFetchData(["ingredients"], () => fetchData(url));

  return (
    <IngredientSearchContext.Provider value={{ dropdowns, setDropdowns, ingredientsList }}>
      <div>
        <DropdownsContainer />
        {results.length > 0 && resultsSuccess && (
          <IngredientSearchResults results={results.map((result) => result.data)} dropdowns={dropdowns} />
        )}
      </div>
    </IngredientSearchContext.Provider>
  );
};
