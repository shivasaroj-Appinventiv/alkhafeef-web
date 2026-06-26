import type { Metadata } from "next";
import ContentPageLoader from "@/components/content/ContentPageLoader";
import { CONTENT_PAGE_TYPE } from "@/lib/content/constants";

export const metadata: Metadata = {
  title: "About Us | Alkhafeef",
  description: "About Alkhafeef Company for Food and Catering.",
};

export default function AboutUsPage() {
  return <ContentPageLoader type={CONTENT_PAGE_TYPE.ABOUT_US} />;
}
