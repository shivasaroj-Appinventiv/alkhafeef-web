export type ContentPageApiType = 1 | 2 | 3 | 4;

export interface ContentDetailsData {
  _id: string;
  status: string;
  title: string;
  description: string;
  descriptionArabic: string;
}

export interface ContentDetailsResponse {
  statusCode: number;
  message: string;
  type: "CONTENT_DETAILS";
  data: ContentDetailsData;
}

export interface FetchContentDetailsOptions {
  lang?: "en" | "ar";
  revalidate?: number;
}
