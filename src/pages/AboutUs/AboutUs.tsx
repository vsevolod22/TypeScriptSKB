import { useState, useEffect } from "react";
import { getPosts } from "@/modules/api/api";
import { PagePost } from "@/widgets/PostPage";

export default function AboutUs() {
  const [post, setPost] = useState<Post | undefined>();

  useEffect(() => {
    const loadData = async () => {
      const newPost = await getPosts("aboutus");
      setPost(newPost[0]);
    };
    loadData();
  }, []);

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
