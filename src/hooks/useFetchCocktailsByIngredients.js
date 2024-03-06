import { fetchData } from "../utils/api";
import { useQueries } from "@tanstack/react-query";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

export const useFetchCocktailsByIngredients = (dropdowns) => {
  const results = useQueries({
    queries: dropdowns
      .filter((dropdown) => dropdown.value)
      .map((dropdown) => {
        return {
          queryKey: ["results", dropdown],
          queryFn: () => fetchData(baseUrl, dropdown.value),
          staleTime: Infinity,
          cacheTime: Infinity,
          enabled: !!dropdown.value,
        };
      }),
  });
  const resultsSuccess = results.every((result) => result.isSuccess);

  return { results, resultsSuccess };
};
