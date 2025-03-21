import { labItems } from "@/pages/MainPage/ui/MainPage/mockData";
import { CardList } from "@/widgets/CardList/CardList";
import { GridConfig } from "@/widgets/CardList/types";
interface ListProps {
  gridConfig?: GridConfig;
}

const NewsList = ({ gridConfig = { desktop: 3, mobile: 1 } }: ListProps) => (
  <div style={{ margin: "0 10%" }}>
    <CardList
      items={labItems}
      variant="news"
      gridConfig={gridConfig}
      title="Новости"
    />
  </div>
);

// Компонент списка лабораторий
const LabsList = ({ gridConfig = { desktop: 3, mobile: 1 } }: ListProps) => (
  <div style={{ margin: "0 10%" }}>
    <CardList
      items={labItems}
      variant="lab"
      gridConfig={gridConfig}
      title="Лаборатории"
    />
  </div>
);

// Компонент списка проектов
const ProjectsList = ({
  gridConfig = { desktop: 3, mobile: 1 },
}: ListProps) => (
  <div style={{ margin: "0 10%" }}>
    <CardList
      items={labItems}
      variant="project"
      gridConfig={gridConfig}
      title="Проекты"
    />
  </div>
);

export { NewsList, LabsList, ProjectsList };
