export interface MenuData {
  _id: string;
  displayOrder: number;
  isTimeRangeSet: boolean;
  itemCount: number;
  menuEvent: unknown[];
  menuImageUrl: string;
  timeRange: unknown[];
  titleArabic: string;
  titleEnglish: string;
}

export interface MenuResponse {
  statusCode: number;
  message: string;
  type: "GET_MENUS";
  data: MenuData[];
}

export interface FetchMenuOptions {
  servicesAvailable?: "pickup" | "delivery" | "both";
  lang?: "en" | "ar";
  revalidate?: number;
}
