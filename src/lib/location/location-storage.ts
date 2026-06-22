import { SelectedLocation } from "@/types/location";

const SELECTED_LOCATION_KEY = "alkhafeef_selected_location";

export function loadSelectedLocation(): SelectedLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SELECTED_LOCATION_KEY);
    return raw ? (JSON.parse(raw) as SelectedLocation) : null;
  } catch (error) {
    return null;
  }
}

export function saveSelectedLocation(location: SelectedLocation | null) {
  if (typeof window === "undefined") return;

  if (location) {
    localStorage.setItem(SELECTED_LOCATION_KEY, JSON.stringify(location));
    return;
  }

  localStorage.removeItem(SELECTED_LOCATION_KEY);
}
