import { CalendarEvent } from "@/features/calendar/types/calendar";

type FilterParams = {
  categories: string[];
  search: string;
  startDate?: string;
  endDate?: string;
};

/* ==================================================
   イベント検索・フィルタリング
   - カテゴリ
   - タイトル / 詳細検索
   - 日付範囲
================================================== */
export function filterEvents(
  events: CalendarEvent[],
  { categories, search, startDate, endDate }: FilterParams,
): CalendarEvent[] {
  const keyword = search.trim().toLowerCase();

  return events.filter((event) => {
    const matchesCategory =
      categories.length === 0 || categories.includes(event.category);

    const matchesSearch =
      keyword === "" ||
      event.title.toLowerCase().includes(keyword) ||
      (event.description?.toLowerCase().includes(keyword) ?? false);

    const matchesStartDate =
      !startDate || event.start >= new Date(`${startDate}T00:00:00`);

    const matchesEndDate =
      !endDate || event.start <= new Date(`${endDate}T23:59:59`);

    return (
      matchesCategory && matchesSearch && matchesStartDate && matchesEndDate
    );
  });
}
