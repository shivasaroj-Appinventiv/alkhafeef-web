import {
  loadSelectedLocation,
  saveSelectedLocation,
} from "@/lib/location/location-storage";
import { mapApiStoreList } from "@/lib/location/store-mapper";
import { locationService } from "@/services/location.service";
import type {
  FetchStoresParams,
  LocationState,
  SelectedLocation,
  ServiceType,
  Store,
} from "@/types/location";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: LocationState = {
  isLocationModalOpen: false,
  stores: [],
  selectedLocation: null,
  activeStoreId: null,
  activeServiceType: null,
  searchQuery: "",
  userCoords: null,
  status: "idle",
};

export const fetchStores = createAsyncThunk(
  "location/fetchStores",
  async (params: FetchStoresParams = {}, { signal }) => {
    const response = await locationService.getStoreList(params, signal);
    const list = response.data.data?.list ?? [];
    return mapApiStoreList(list);
  },
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    hydrateLocationState(state) {
      const saved = loadSelectedLocation();
      state.selectedLocation = saved;
      state.activeStoreId = saved?.store.storeId ?? null;
      state.activeServiceType = saved?.serviceType ?? null;
    },
    openLocationModal(state) {
      state.isLocationModalOpen = true;
    },
    closeLocationModal(state) {
      state.isLocationModalOpen = false;
      state.searchQuery = "";
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setUserCoords(
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>,
    ) {
      state.userCoords = action.payload;
    },
    selectStore(state, action: PayloadAction<Store>) {
      state.activeStoreId = action.payload.storeId;
    },
    selectServiceType(state, action: PayloadAction<ServiceType>) {
      state.activeServiceType = action.payload;
    },
    confirmLocationSelection(state) {
      const store = state.stores.find(
        (item) => item.storeId === state.activeStoreId,
      );
      if (!store || !state.activeServiceType) return;

      const selected: SelectedLocation = {
        store,
        serviceType: state.activeServiceType,
      };

      state.selectedLocation = selected;
      saveSelectedLocation(selected);
      state.isLocationModalOpen = false;
    },
    clearSelectedLocation(state) {
      state.selectedLocation = null;
      state.activeStoreId = null;
      state.activeServiceType = null;
      saveSelectedLocation(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "idle";
        state.stores = action.payload;

        const hasActiveStore = action.payload.some(
          (store) => store.storeId === state.activeStoreId,
        );

        if (!hasActiveStore) {
          state.activeStoreId = action.payload[0]?.storeId ?? null;
        }

        if (state.selectedLocation) {
          const freshStore = action.payload.find(
            (store) => store.storeId === state.selectedLocation?.store.storeId,
          );

          if (freshStore) {
            state.selectedLocation = {
              ...state.selectedLocation,
              store: freshStore,
            };
            saveSelectedLocation(state.selectedLocation);
          }
        }
      })
      .addCase(fetchStores.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = "failed";
        state.stores = [];
      });
  },
});

export const {
  hydrateLocationState,
  openLocationModal,
  closeLocationModal,
  setSearchQuery,
  setUserCoords,
  selectStore,
  selectServiceType,
  confirmLocationSelection,
  clearSelectedLocation,
} = locationSlice.actions;

export const selectSelectedStoreName = (state: { location: LocationState }) =>
  state.location.selectedLocation?.store.storeName ?? "";

export const selectSelectedServiceLabel = (state: {
  location: LocationState;
}) => {
  const type = state.location.selectedLocation?.serviceType;
  if (!type) return "";
  return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ");
};

export default locationSlice.reducer;
