import { CardListProps } from "@/widgets/CardList/types";
import styles from "./CardList.module.scss";
import { Card } from "@/widgets/Card/Card";
import { classNames } from "@/shared/lib/classNames/classNames";

export const CardList = ({
  items,
  variant = "lab", // Значение по умолчанию
  gridConfig = { desktop: 3, mobile: 1 },
  title = "Лаборатории",
}: CardListProps) => {
  const itemsArray = Object.values(items);

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div
        className={styles.list + " " + styles[`list__${variant}`]} // Используем classNames
        style={
          {
            "--desktop-columns": gridConfig.desktop,
            "--mobile-columns": gridConfig.mobile,
          } as React.CSSProperties
        }
      >
        {itemsArray.map((item) => (
          <Card key={item.name} data={{ ...item, variant }} />
        ))}
      </div>
    </div>
  );
};
