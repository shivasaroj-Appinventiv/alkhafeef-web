import { CONTENT_PAGE_TITLES } from "@/lib/content/constants";
import { fetchContentDetails } from "@/lib/contentFetcher";
import type { ContentPageApiType } from "@/types/content";
import ContentPage from "./ContentPage";

interface ContentPageLoaderProps {
  type: ContentPageApiType;
}

export default async function ContentPageLoader({ type }: ContentPageLoaderProps) {
  const content = await fetchContentDetails(type);

  return (
    <ContentPage
      title={CONTENT_PAGE_TITLES[type]}
      htmlContent={content.description}
    />
  );
}
