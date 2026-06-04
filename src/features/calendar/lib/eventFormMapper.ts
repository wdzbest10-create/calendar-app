import { CalendarEvent } from "@/features/calendar/types/calendar";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import { getDateKey } from "@/features/calendar/lib/date";
import {
  EVENT_CATEGORIES,
  DEFAULT_EVENT_CATEGORY,
} from "@/features/calendar/constants/categories";

/* ==================================================
   EventForm から CalendarEvent へ変換
================================================== */
export function eventFormToCalendarEvent(
  data: EventForm,
  currentEvent?: CalendarEvent | null,
): CalendarEvent {
  const start = new Date(data.startDate);
  start.setHours(data.startHour, data.startMinute, 0, 0);

  const end = new Date(data.endDate);
  end.setHours(data.endHour, data.endMinute, 0, 0);

  return {
    id: currentEvent?.originalId ?? currentEvent?.id ?? crypto.randomUUID(),
    title: data.title,
    start,
    end,
    date: getDateKey(start),
    location: data.location,
    description: data.description,
    category: data.category,
    color: data.color,
    repeat: {
      type: data.repeatType,
      interval: data.repeatInterval,
    },
    allDay: data.allDay,
  };
}

/* ==================================================
   CalendarEvent から EventForm へ変換
================================================== */
export function calendarEventToEventForm(event: CalendarEvent): EventForm {
  const category = EVENT_CATEGORIES.find((cat) => cat === event.category);

  return {
    title: event.title,
    startDate: getDateKey(event.start),
    startHour: event.start.getHours(),
    startMinute: event.start.getMinutes(),
    endDate: getDateKey(event.end),
    endHour: event.end.getHours(),
    endMinute: event.end.getMinutes(),
    location: event.location ?? "",
    description: event.description ?? "",
    category: category ?? DEFAULT_EVENT_CATEGORY,
    color: event.color,
    repeatType: event.repeat?.type ?? "none",
    repeatInterval: event.repeat?.interval ?? 1,
    allDay: event.allDay ?? false,
  };
}
