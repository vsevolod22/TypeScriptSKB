import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/get";

export const usePosts = (category?: string) => {
  return useQuery<App.ProjectPost[], Error, App.ProjectPost[]>({
    queryKey: ["posts", category],
    queryFn: fetchPosts,
    select: (data) => {
      return category ? data.filter((post) => post.lab === category) : data;
    },
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};
