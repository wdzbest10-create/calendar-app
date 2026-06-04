import { CalendarEvent } from "@/features/calendar/types/calendar";
import { RepeatRule } from "@/features/calendar/types/recurrence";
import { getDateKey } from "@/features/calendar/lib/date";

const MAX_REPEAT_COUNT = 1000;

/* ==================================================
   繰り返しイベントを次の発生日へ進める
================================================== */
function moveToNextOccurrence(current: Date, repeat: RepeatRule) {
  switch (repeat.type) {
    case "daily":
      current.setDate(current.getDate() + repeat.interval);
      break;

    case "weekly":
      current.setDate(current.getDate() + 7 * repeat.interval);
      break;

    case "monthly":
      current.setMonth(current.getMonth() + repeat.interval);
      break;

    case "yearly":
      current.setFullYear(current.getFullYear() + repeat.interval);
      break;
  }
}

/* ==================================================
   繰り返しイベントを表示範囲内に展開
   - 通常イベントはそのまま追加
   - 繰り返しイベントは日付ごとのインスタンスに変換
   - delete 例外は非表示
   - modify 例外はその日の内容だけ差し替え
================================================== */
export function expandRecurringEvents(
  events: CalendarEvent[],
  rangeStart: Date,
  rangeEnd: Date,
): CalendarEvent[] {
  const result: CalendarEvent[] = [];

  events.forEach((event) => {
    if (!event.repeat || event.repeat.type === "none") {
      result.push(event);
      return;
    }

    const current = new Date(event.start);
    const duration = event.end.getTime() - event.start.getTime();

    let count = 0;

    while (current <= rangeEnd && count < MAX_REPEAT_COUNT) {
      count++;

      if (event.repeat.until && current >= event.repeat.until) {
        break;
      }

      if (current >= rangeStart) {
        const dateKey = getDateKey(current);
        const exception = event.exceptions?.find((ex) => ex.date === dateKey);

        if (exception?.type !== "delete") {
          const instance: CalendarEvent = {
            ...event,
            id: `${event.id}_${current.toISOString()}`,
            originalId: event.id,
            start: new Date(current),
            end: new Date(current.getTime() + duration),
            date: dateKey,
          };

          result.push(
            exception?.type === "modify" && exception.modified
              ? {
                  ...instance,
                  ...exception.modified,
                  id: instance.id,
                  originalId: event.id,
                }
              : instance,
          );
        }
      }

      moveToNextOccurrence(current, event.repeat);
    }
  });

  return result;
}
