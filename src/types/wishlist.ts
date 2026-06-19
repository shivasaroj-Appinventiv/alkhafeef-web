export interface AddToWishlistPayload {
  hashId: string;
  isFavourite?: boolean;
  itemId: string;
  itemSdmId: number;
  menuId: string;
  servicesAvailable: string;
}

export interface RemoveFromWishlistPayload {
  hashId: string;
  isFavourite?: boolean;
  itemId: string;
  itemSdmId: number;
  menuId: string;
  servicesAvailable: string;
}



export interface WishlistListApiResponse {
  statusCode: number;
  message: string;
  type: "FAVOURITES_HASH_ID";
  data: string[];
}  

export interface AddRemoveToWishlistApiResponse {
  statusCode: number;
  message: string;
  type: "ITEM_UNFAVOURITES"|"ITEM_ADDED_IN_FAVOURITES";
  data: {};
}


export interface WishlistState {
  hashIds: string[];
  status: "idle" | "loading" | "succeeded" | "error";
  mutatingItemIds: string[];
}