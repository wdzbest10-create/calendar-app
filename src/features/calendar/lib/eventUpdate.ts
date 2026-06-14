import { CalendarEvent } from "@/features/calendar/types/calendar";
import { getDateKey } from "@/features/calendar/lib/date";
import { createModifiedEvent } from "@/features/calendar/lib/eventModify";

/* ==================================================
   繰り返しインスタンスの元の日付を取得
   id は「originalId_ISO文字列」の形式で作成されている
================================================== */
function getOriginalDateKey(event: CalendarEvent) {
  if (!event.originalId) {
    return getDateKey(event.start);
  }

  const originalDateIso = event.id.replace(`${event.originalId}_`, "");
  return getDateKey(new Date(originalDateIso));
}

/* ==================================================
   ドラッグ・リサイズ時のイベント更新
   - 通常イベント: 直接更新
   - 繰り返しイベント: 元イベントに modify 例外を追加
================================================== */
export function updateCalendarEvent(
  events: CalendarEvent[],
  updated: CalendarEvent,
): CalendarEvent[] {
  if (!updated.originalId) {
    return events.map((event) => (event.id === updated.id ? updated : event));
  }

  const targetDate = getOriginalDateKey(updated);

  return events.map((event) => {
    if (event.id !== updated.originalId) {
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
          modified: createModifiedEvent(updated),
        },
      ],
    };
  });
}
