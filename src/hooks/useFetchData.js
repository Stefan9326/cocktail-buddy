import { useQuery } from "@tanstack/react-query";

export const useFetchData = (queryKey, queryFn) => {
  const {
    isLoading,
    isSuccess,
    data: results,
  } = useQuery({
    queryKey,
    queryFn,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isLoading, isSuccess, results };
};
