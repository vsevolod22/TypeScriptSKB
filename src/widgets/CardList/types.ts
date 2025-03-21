export interface GridConfig {
  desktop: number;
  mobile: number;
}
export interface CardData {
  name: string; // Уникальное имя (используется как ключ)
  previewText: string; // Описание
  link: string; // Ссылка
  preview: string; // URL изображения
}

export interface CardListProps {
  items: Record<string, CardData>; // Объект объектов
  variant?: "lab" | "news" | "project";
  gridConfig?: GridConfig;
  title: string;
}
