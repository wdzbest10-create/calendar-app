import { holidaysByYear } from "@/features/calendar/constants/holidays";

export function getHolidayName(date: Date) {
  const year = date.getFullYear();

  const monthDay =
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  return holidaysByYear[year]?.[monthDay] ?? "";
}

export function isHoliday(date: Date) {
  return getHolidayName(date) !== "";
}
