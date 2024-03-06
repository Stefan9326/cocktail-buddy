import { useQuery } from "@tanstack/react-query";

export const useFetchData = (queryKey, queryFn) => {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: results,
  } = useQuery({
    queryKey,
    queryFn,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isLoading, isError, error, isSuccess, results };
};
