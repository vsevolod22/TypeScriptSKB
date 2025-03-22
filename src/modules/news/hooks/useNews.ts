import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNews } from "../api/get";

export const useNews = (params?: { count?: number; offset?: number }) => {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => fetchNews(params),
    placeholderData: keepPreviousData,
  });
};
