import type { Metadata } from "next";
import ContentPageLoader from "@/components/content/ContentPageLoader";
import { CONTENT_PAGE_TYPE } from "@/lib/content/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Alkhafeef",
  description: "Alkhafeef privacy policy and data protection information.",
};

export default function PrivacyPolicyPage() {
  return <ContentPageLoader type={CONTENT_PAGE_TYPE.PRIVACY_POLICY} />;
}
