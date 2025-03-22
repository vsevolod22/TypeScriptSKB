import { parseContent } from "@/shared/api/parseContent";
import { wp } from "@/shared/api/wp-client";

export const fetchPosts = async (): Promise<App.ProjectPost[]> => {
  const [posts, categories] = await Promise.all([
    wp.posts().param("per_page", 100).get() as Promise<WPv2.Post[]>,
    wp.categories().get() as Promise<WPv2.Category[]>,
  ]);

  const categoryMap = new Map<number, string>(
    categories.map((c) => [c.id, c.name])
  );

  return posts.map((post) => ({
    id: post.id,
    title: post.title.rendered,
    content: parseContent(post.content.rendered),
    lab: categoryMap.get(post.categories[0]) || "uncategorized", // Убедимся, что lab всегда строка
    preview: post.featured_media?.toString(),
  }));
};
