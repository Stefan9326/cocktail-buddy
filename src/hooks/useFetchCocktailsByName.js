import { useQuery } from "@tanstack/react-query";
import { fetchCocktailsByName } from "../api";

const useFetchCocktailsByName = (userInput) => {
  return useQuery(["cocktails", userInput], () => fetchCocktailsByName(userInput));
};

export default useFetchCocktailsByName;
