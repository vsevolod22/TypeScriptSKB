import { usePosts } from "@/modules/posts/hooks/usePosts";
import { PagePost } from "@/widgets/PostPage";

export default function AboutUs() {
  const { data: posts, isLoading, isError } = usePosts("aboutus");

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  const post = posts?.[0];
  console.log(posts);
  return (
    <>
      {post && (
        <PagePost post={post}>
          <div className="btn">Показать еще</div>
        </PagePost>
      )}
    </>
  );
}
