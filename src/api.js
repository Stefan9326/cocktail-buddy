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
