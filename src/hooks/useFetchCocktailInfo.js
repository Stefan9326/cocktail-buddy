import { useFetchData } from "./useFetchData";
import { fetchData } from "../utils/api";
import { getCocktailIngredients } from "@utils";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const useFetchCocktailInfo = (result, dropdowns) => {
  let ingredients = [];
  let matchedIngredients = [];

  const { isSuccess, results: cocktailInfo } = useFetchData(["ingredients", result.idDrink], () =>
    fetchData(baseUrl, result.idDrink)
  );

  if (isSuccess) {
    ingredients = getCocktailIngredients(cocktailInfo);

    matchedIngredients = dropdowns
      .map((dropdown) => dropdown.value[0] + dropdown.value.slice(1).toLowerCase())
      .filter((value) => ingredients.includes(value));
  }

  return { cocktailInfo, isSuccess, ingredients, matchedIngredients };
};
