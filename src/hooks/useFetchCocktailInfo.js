import { useQuery } from "@tanstack/react-query";
import { fetchCocktailById } from "../utils/api";

const useFetchCocktailInfo = (result, dropdowns) => {
  let ingredients = [];
  let matchedIngredients = [];

  const { data: cocktailInfo, isSuccess } = useQuery({
    queryKey: ["ingredients", result.idDrink],
    queryFn: () => fetchCocktailById(result.idDrink),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

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
