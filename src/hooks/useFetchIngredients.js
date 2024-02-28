import { useQuery } from "@tanstack/react-query";
import { fetchIngredientsList } from "../api";

export const useFetchIngredients = () => {
  const { data: ingredientsList } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredientsList,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { ingredientsList };
};
