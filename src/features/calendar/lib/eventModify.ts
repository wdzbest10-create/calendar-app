import { CalendarEvent } from "@/features/calendar/types/calendar";
import { getDateKey } from "@/features/calendar/lib/date";

export function createModifiedEvent(
  event: CalendarEvent,
): Partial<CalendarEvent> {
  return {
    title: event.title,
    start: event.start,
    end: event.end,
    date: getDateKey(event.start),
    location: event.location,
    description: event.description,
    category: event.category,
    color: event.color,
    allDay: event.allDay,
  };
}
