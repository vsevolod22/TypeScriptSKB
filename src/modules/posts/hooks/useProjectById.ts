import { useQuery } from "@tanstack/react-query";

import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";

interface ProjectPost {
  id: number;
  title: string;
  content: ReturnType<typeof parseContent>;
  lab?: string;
  preview?: number;
}

export const useProjectById = (id: number) => {
  return useQuery<ProjectPost>({
    queryKey: ["project", id],
    queryFn: async () => {
      const post = (await wp.posts().id(id).get()) as WPv2.Post;
      const categories = (await wp
        .categories()
        .param("post", id)
        .get()) as WPv2.Category[];

      return {
        id: post.id,
        title: post.title.rendered,
        content: parseContent(post.content.rendered),
        lab: categories[0]?.name,
        preview: post.featured_media,
      };
    },
    enabled: !!id,
  });
};
