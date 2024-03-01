import { fetchResultsByIngredient } from "../api";
import { useQueries } from "@tanstack/react-query";

const useFetchResults = (dropdowns) => {
  const results = useQueries({
    queries: dropdowns
      .filter((dropdown) => dropdown.value)
      .map((ingredient) => {
        return {
          queryKey: ["results", ingredient],
          queryFn: () => fetchResultsByIngredient(ingredient),
          staleTime: Infinity,
          cacheTime: Infinity,
          enabled: !!ingredient.value,
        };
      }),
  });
  const resultsSuccess = results.every((result) => result.isSuccess);

  return { results, resultsSuccess };
};

export default useFetchResults;
