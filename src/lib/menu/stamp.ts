import type { MenuItem } from "@/types/menu";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getPreviousDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function isStampApplicable(item: MenuItem, now = new Date()) {
  if (!item.stampStartDate || !item.stampEndDate) {
    return false;
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const today = now.getTime();

  if (today >= item.stampStartDate && today <= item.stampEndDate) {
    if (
      currentTime >= item.stampFromTime &&
      currentTime <= item.stampToTime
    ) {
      return true;
    }

    if (
      item.stampFromTime >= item.stampToTime &&
      currentTime >= item.stampFromTime
    ) {
      return true;
    }

    return false;
  }

  const previousDate = getPreviousDate();
  const stampEndDay = new Date(item.stampEndDate);

  if (
    today > item.stampEndDate &&
    item.stampToTime <= item.stampFromTime &&
    currentTime <= item.stampToTime &&
    WEEK_DAYS[now.getDay()] === WEEK_DAYS[stampEndDay.getDay()] &&
    formatDateKey(stampEndDay) === formatDateKey(previousDate)
  ) {
    return true;
  }

  return false;
}

export function applyItemStamps<T extends MenuItem>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    isApplicable: isStampApplicable(item),
  }));
}
