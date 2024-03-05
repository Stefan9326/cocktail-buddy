import useFetchData from "./useFetchData";
import { fetchData } from "../utils/api";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const useFetchCocktailInfo = (result, dropdowns) => {
  let ingredients = [];
  let matchedIngredients = [];

  const { isSuccess, results: cocktailInfo } = useFetchData(["ingredients", result.idDrink], () =>
    fetchData(baseUrl, result.idDrink)
  );

  if (isSuccess) {
    ingredients = Object.keys(cocktailInfo)
      .filter((key) => key.startsWith("strIngredient") && cocktailInfo[key])
      .map((key) => cocktailInfo[key])
      .map((ingredient) => ingredient[0] + ingredient.slice(1).toLowerCase());

    matchedIngredients = dropdowns
      .map((dropdown) => dropdown.value[0] + dropdown.value.slice(1).toLowerCase())
      .filter((value) => ingredients.includes(value));
  }

  return { cocktailInfo, isSuccess, ingredients, matchedIngredients };
};

export default useFetchCocktailInfo;
