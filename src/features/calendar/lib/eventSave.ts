import { CalendarEvent } from "@/features/calendar/types/calendar";
import { getDateKey } from "@/features/calendar/lib/date";

type SaveEventParams = {
  events: CalendarEvent[];
  mode: "create" | "edit";
  currentEvent: CalendarEvent | null;
  newEvent: CalendarEvent;
};

/* ==================================================
   繰り返し設定が変更されたか判定
================================================== */
function isRepeatRuleChanged(
  currentEvent: CalendarEvent | null,
  newEvent: CalendarEvent,
) {
  return (
    currentEvent?.repeat?.type !== newEvent.repeat?.type ||
    currentEvent?.repeat?.interval !== newEvent.repeat?.interval
  );
}

/* ==================================================
   例外編集用のデータを作成
================================================== */
function createModifiedEvent(event: CalendarEvent): Partial<CalendarEvent> {
  return {
    title: event.title,
    start: event.start,
    end: event.end,
    date: event.date,
    location: event.location,
    description: event.description,
    category: event.category,
    color: event.color,
    allDay: event.allDay,
  };
}

/* ==================================================
   イベント保存
   - 新規作成
   - 通常イベント編集
   - 繰り返しイベントの1回分編集
   - 繰り返しルール変更時は本体イベントを更新
================================================== */
export function saveEvent({
  events,
  mode,
  currentEvent,
  newEvent,
}: SaveEventParams): CalendarEvent[] {
  if (mode === "create") {
    return [...events, newEvent];
  }

  const repeatChanged = isRepeatRuleChanged(currentEvent, newEvent);

  if (currentEvent?.originalId && repeatChanged) {
    return events.map((event) =>
      event.id === currentEvent.originalId
        ? {
            ...event,
            ...newEvent,
            id: currentEvent.originalId,
            originalId: undefined,
            exceptions: [],
          }
        : event,
    );
  }

  if (currentEvent?.originalId && !repeatChanged) {
    const targetDate = getDateKey(currentEvent.start);

    return events.map((event) => {
      if (event.id !== currentEvent.originalId) {
        return event;
      }

      return {
        ...event,
        exceptions: [
          ...(event.exceptions ?? []).filter(
            (ex) => !(ex.date === targetDate && ex.type === "modify"),
          ),
          {
            date: targetDate,
            type: "modify",
            modified: createModifiedEvent(newEvent),
          },
        ],
      };
    });
  }

  return events.map((event) => (event.id === newEvent.id ? newEvent : event));
}
