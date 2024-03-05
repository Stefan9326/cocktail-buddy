import useFetchData from "./useFetchData";
import { fetchCocktailById } from "../utils/api";

const useFetchCocktailInfo = (result, dropdowns) => {
  let ingredients = [];
  let matchedIngredients = [];

  const { isSuccess, results: cocktailInfo } = useFetchData(["ingredients", result.idDrink], () =>
    fetchCocktailById(result.idDrink)
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
