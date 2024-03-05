import Axios from "axios";

export const fetchData = async (url, dynamicValue = "") => {
  try {
    const response = await Axios.get(url + dynamicValue);
    // Structure of the response is different for the lookup (search for cocktail by Id) endpoint
    if (url.includes("lookup")) {
      return response.data.drinks[0];
    } else {
      return response.data.drinks;
    }
  } catch (error) {
    throw error(error);
  }
};
