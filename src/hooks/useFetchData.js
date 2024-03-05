import { useQuery } from "@tanstack/react-query";

const useFetchData = (queryKey, queryFn) => {
  const { isSuccess, data: results } = useQuery({
    queryKey,
    queryFn,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { isSuccess, results };
};

export default useFetchData;
