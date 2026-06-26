import type { Metadata } from "next";
import ContentPageLoader from "@/components/content/ContentPageLoader";
import { CONTENT_PAGE_TYPE } from "@/lib/content/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | Alkhafeef",
  description: "Terms and conditions for using Alkhafeef services.",
};

export default function TermsAndConditionsPage() {
  return <ContentPageLoader type={CONTENT_PAGE_TYPE.TERMS_AND_CONDITIONS} />;
}
