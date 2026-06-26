import type { ContentPageApiType } from "@/types/content";

export const CONTENT_PAGE_TYPE = {
  OUR_VISION: 1,
  PRIVACY_POLICY: 2,
  TERMS_AND_CONDITIONS: 3,
  ABOUT_US: 4,
} as const satisfies Record<string, ContentPageApiType>;

export const CONTENT_PAGE_TITLES: Record<ContentPageApiType, string> = {
  [CONTENT_PAGE_TYPE.OUR_VISION]: "Our Vision",
  [CONTENT_PAGE_TYPE.PRIVACY_POLICY]: "Privacy Policy",
  [CONTENT_PAGE_TYPE.TERMS_AND_CONDITIONS]: "Terms & Conditions",
  [CONTENT_PAGE_TYPE.ABOUT_US]: "About Us",
};
