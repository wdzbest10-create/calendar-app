import { CalendarEvent } from "@/features/calendar/types/calendar";
import { getDateKey } from "@/features/calendar/lib/date";

export type DeleteChoice = "one" | "future";

type DeleteEventParams = {
  events: CalendarEvent[];
  currentEvent: CalendarEvent;
  choice?: DeleteChoice;
};

/* ==================================================
   イベント削除
   - 通常イベント: 配列から削除
   - 繰り返しイベントの1回分: exceptions に delete を追加
   - 繰り返しイベントの以降すべて: repeat.until を設定
================================================== */
export function deleteCalendarEvent({
  events,
  currentEvent,
  choice,
}: DeleteEventParams): CalendarEvent[] {
  const isRecurringInstance = Boolean(currentEvent.originalId);

  if (!isRecurringInstance) {
    return events.filter((event) => event.id !== currentEvent.id);
  }

  if (!choice) {
    return events;
  }

  const targetDate = getDateKey(currentEvent.start);

  return events.map((event) => {
    if (event.id !== currentEvent.originalId) {
      return event;
    }

    if (choice === "one") {
      return {
        ...event,
        exceptions: [
          ...(event.exceptions ?? []),
          {
            date: targetDate,
            type: "delete",
          },
        ],
      };
    }

    return {
      ...event,
      repeat: {
        ...event.repeat!,
        until: currentEvent.start,
      },
    };
  });
}
