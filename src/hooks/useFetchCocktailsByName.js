import { useQuery } from "@tanstack/react-query";
import { fetchCocktailsByName } from "../utils/api";

const useFetchCocktailsByName = (userInput) => {
  const { isSuccess, data: results } = useQuery({
    queryKey: ["cocktails", userInput],
    queryFn: () => fetchCocktailsByName(userInput),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isSuccess, results };
};

export default useFetchCocktailsByName;
