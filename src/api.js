import Axios from "axios";

export const fetchIngredientsList = async () => {
  try {
    const response = await Axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );
    return response.data.drinks;
  } catch (error) {
    throw error(error);
  }
};

export const fetchCocktailById = async (id) => {
  try {
    const response = await Axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    console.log(response);
    return response.data.drinks[0];
  } catch (error) {
    console.error(error);
  }
};
