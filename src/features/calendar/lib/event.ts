import { CalendarEvent } from "@/features/calendar/types/calendar";
import { DEFAULT_EVENT_CATEGORY } from "@/features/calendar/constants/categories";
import { DEFAULT_EVENT_COLOR } from "@/features/calendar/constants/colors";
import { getDateKey } from "@/features/calendar/lib/date";

/* ==================================================
   新規イベントの初期値を生成
================================================== */
export function createDefaultEvent(date: Date, hour = 9): CalendarEvent {
  const start = new Date(date);
  start.setHours(hour, 0, 0, 0);

  const end = new Date(start);
  end.setHours(hour + 1);

  return {
    id: crypto.randomUUID(),
    title: "",
    start,
    end,
    date: getDateKey(start),
    category: DEFAULT_EVENT_CATEGORY,
    color: DEFAULT_EVENT_COLOR,
    allDay: false,
  };
}
