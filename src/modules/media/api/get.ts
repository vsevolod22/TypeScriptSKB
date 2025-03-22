import { wp } from "@/shared/api/wp-client";

export interface MediaItem {
  id: number;
  src: string;
  category: string;
  name: string;
}

export const fetchMedia = async (): Promise<MediaItem[]> => {
  const media = (await wp.media()) as WPv2.Media[];

  return media.map(({ id, source_url, alt_text }: WPv2.Media) => {
    const [category = "uncategorized", name = "unknown"] =
      alt_text?.split("_") || [];
    return { id, src: source_url, category, name };
  });
};
