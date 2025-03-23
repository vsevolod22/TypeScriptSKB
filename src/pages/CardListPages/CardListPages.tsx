// pages/MainPage/ui/MainPage/Lists.tsx
import { CardList } from "@/widgets/CardList/CardList";
import { GridConfig } from "@/widgets/CardList/types";
import { usePosts } from "@/modules/posts/hooks/usePosts";

import { useNews } from "@/modules";
import {
  transformNewsToCardData,
  transformPostsToCardData,
} from "@/pages/CardListPages/CardListFunctions";

interface ListProps {
  gridConfig?: GridConfig;
}

const NewsList = ({ gridConfig = { desktop: 3, mobile: 1 } }: ListProps) => {
  const { data: newsData, isLoading, isError } = useNews();
  console.log(newsData);
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных</div>;
  return (
    <div style={{ margin: "0 10%" }}>
      {newsData && (
        <CardList
          items={transformNewsToCardData(newsData)}
          variant="news"
          gridConfig={gridConfig}
          title="Новости"
        />
      )}
    </div>
  );
};

const LabsList = ({ gridConfig = { desktop: 3, mobile: 1 } }: ListProps) => {
  const { data: postsData } = usePosts();
  const labs = postsData?.labs ? Object.values(postsData.labs) : [];

  return (
    <div style={{ margin: "0 10%" }}>
      <CardList
        items={transformPostsToCardData(labs)}
        variant="lab"
        gridConfig={gridConfig}
        title="Лаборатории"
      />
    </div>
  );
};

const ProjectsList = ({
  gridConfig = { desktop: 3, mobile: 1 },
}: ListProps) => {
  const { data: postsData } = usePosts();
  const projects = postsData?.projects ? Object.values(postsData.projects) : [];

  return (
    <div style={{ margin: "0 10%" }}>
      <CardList
        items={transformPostsToCardData(projects)}
        variant="project"
        gridConfig={gridConfig}
        title="Проекты"
      />
    </div>
  );
};

export { NewsList, LabsList, ProjectsList };
