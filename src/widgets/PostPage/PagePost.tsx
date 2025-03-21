import { ReactNode } from "react";

import MediaBlock from "@/widgets/MediaBlock/MediaBlock";

import { PageContent, PageHeader } from "@/widgets/PostPage";

interface PagePostProps {
  post: Post;
  isLab?: boolean;
  children?: ReactNode;
}

export default function PagePost({
  post,
  isLab = false,
  children,
}: PagePostProps) {
  return (
    <>
      <PageHeader className="header">
        <h1>{post.name}</h1>
      </PageHeader>
      <PageContent className="content">
        {Array.isArray(post.content) &&
          post.content.map((el, index) => {
            if (el.type === "mediablock") {
              return <MediaBlock key={index} images={el.value} />;
            }
            return <div key={index}>{el.value}</div>;
          })}
        {children}
      </PageContent>
    </>
  );
}
