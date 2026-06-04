import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import { DEFAULT_EVENT_CATEGORY } from "@/features/calendar/constants/categories";
import { DEFAULT_EVENT_COLOR } from "@/features/calendar/constants/colors";
import { getDateKey } from "@/features/calendar/lib/date";

/* ==================================================
   新規イベントフォームの初期値を生成
================================================== */
export function createDefaultEventForm(): EventForm {
  const start = new Date();
  start.setMinutes(0, 0, 0);

  const end = new Date(start);
  end.setHours(start.getHours() + 1);

  return {
    title: "",
    startDate: getDateKey(start),
    startHour: start.getHours(),
    startMinute: 0,
    endDate: getDateKey(end),
    endHour: end.getHours(),
    endMinute: 0,
    location: "",
    description: "",
    category: DEFAULT_EVENT_CATEGORY,
    color: DEFAULT_EVENT_COLOR,
    repeatType: "none",
    repeatInterval: 1,
    allDay: false,
  };
}
