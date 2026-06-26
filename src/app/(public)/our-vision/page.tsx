import type { Metadata } from "next";
import ContentPageLoader from "@/components/content/ContentPageLoader";
import { CONTENT_PAGE_TYPE } from "@/lib/content/constants";

export const metadata: Metadata = {
  title: "Our Vision | Alkhafeef",
  description: "Learn about Alkhafeef's vision for quality food and hospitality.",
};

export default function OurVisionPage() {
  return <ContentPageLoader type={CONTENT_PAGE_TYPE.OUR_VISION} />;
}
