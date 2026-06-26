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

export interface MenuItem {
  _id: string;

  itemId: number;
  menuId: string;

  nameEnglish: string;
  nameArabic: string;

  titleEnglish: string;
  titleArabic: string;

  descriptionEnglish: string;
  descriptionArabic: string;

  itemImageUrl: string;
  mediaType: string;
  calories: number;
  price: number;

  isAvailable: boolean;
  isCustomised: boolean;
  isOfferExcluded: boolean;
  isTimeRangeSet: boolean;

  servicesAvailable: string;

  allergicComponent: string[];
  excludeLocations: string[];
  timeRange: string[];

  nutritionArabic: string;
  nutritionEnglish: string;

  stampStartDate: number;
  stampEndDate: number;
  stampFromTime: number;
  stampToTime: number;

  stampName?: string;
  stampNameAr?: string;
  stampColorCode?: string;
  isApplicable?: boolean;

  thumbnailImage?: string | null;
}

export interface Modifier {
  _id: string;
  isAvailable: boolean;
  maximum: number;
  minimum: number;
  modifierImageUrl: string;
  nameArabic: string;
  nameEnglish: string;
  price: number;
  sdmId: number;
}

export interface ModGroup {
  _id: string;
  isAvailable: boolean;
  isRequired: boolean;
  maximum: number;
  minimum: number;
  modGroupId: number;
  modType: string;
  modifiersId: string[];
  title: string;
  titleUn: string;
  modifiers: Modifier[];
}

export interface MenuItemDetail extends MenuItem {
  modGroups?: ModGroup[];
  cartRefrences?: unknown;
  status?: string;
}

export interface ExploreMenuOnHomeProps {
  menus: MenuData[];
}

export interface FavoriteItem {
  itemDetails: MenuItem;
}

export interface NutritionInfo {
  physical_activity_to_burn: {
    value: number;
    unit: string;
  };

  cholesterol: {
    value: number;
    unit: string;
  };

  fiber: {
    value: number;
    unit: string;
  };

  full_fat: {
    value: number;
    unit: string;
  };

  saturated_fat: {
    value: number;
    unit: string;
  };

  trans_fat: {
    value: number;
    unit: string;
  };

  salt: {
    value: number;
    unit: string;
  };

  added_suger: {
    value: number;
    unit: string;
  };

  total_suger: {
    value: number;
    unit: string;
  };

  carbohydrates: {
    value: number;
    unit: string;
  };

  protein: {
    value: number;
    unit: string;
  };

  sodium: {
    value: number;
    unit: string;
  };

  is_extra_salt: {
    value: boolean;
  };
}
