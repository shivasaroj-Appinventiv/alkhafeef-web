export interface BannerData {
  _id: string;
  status: 'active' | 'inactive';
  titleEnglish: string;
  titleArabic: string;
  imageEnUrl: string;
  imageArUrl: string;
  itemId: string;
  categoryId: string;
  isBanner: boolean;
  mediaType: string;
  servicesAvailable: string;
  typeOfRedirection: 'item' | 'category' | 'url';
  timeRange: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BannerResponse {
  statusCode: number;
  message: string;
  type: 'GET_BANNERS';
  data: BannerData[];
}

export interface FetchBannerOptions {
  servicesAvailable?: 'pickup' | 'delivery' | 'both';
  lang?: 'en' | 'ar';
  revalidate?: number;
}
