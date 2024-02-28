import Axios from "axios";

export const fetchIngredientsList = async () => {
  try {
    const response = await Axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
    return response.data.drinks;
  } catch (error) {
    throw error(error);
  }
};

export const fetchResultsByIngredient = async (ingredient) => {
  const response = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.value}`);
  return response.data.drinks;
};

export const fetchCocktailById = async (id) => {
  try {
    const response = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.drinks[0];
  } catch (error) {
    throw error(error);
  }
};
