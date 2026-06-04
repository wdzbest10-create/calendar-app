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
   表示範囲内のイベント取得
================================================== */
export function getVisibleEvents(
  events: CalendarEvent[],
  start: Date,
  end: Date,
): CalendarEvent[] {
  const result: CalendarEvent[] = [];

  events.forEach((event) => {
    if (!event.repeat || event.repeat.type === "none") {
      if (event.start < end && event.end > start) {
        result.push(event);
      }

      return;
    }

    const current = new Date(event.start);
    const duration = event.end.getTime() - event.start.getTime();

    while (current < start) {
      moveToNextOccurrence(current, event.repeat);

      if (event.repeat.until && current > event.repeat.until) {
        return;
      }
    }

    let count = 0;

    while (current <= end && count < MAX_REPEAT_COUNT) {
      count++;

      if (event.repeat.until && current > event.repeat.until) {
        break;
      }

      const instanceStart = new Date(current);
      const instanceEnd = new Date(instanceStart.getTime() + duration);

      if (instanceStart < end && instanceEnd > start) {
        const dateKey = getDateKey(instanceStart);
        const exception = event.exceptions?.find((ex) => ex.date === dateKey);

        if (exception?.type === "delete") {
          // 削除例外の日は表示しない
        } else if (exception?.type === "modify" && exception.modified) {
          result.push({
            ...event,
            ...exception.modified,
          });
        } else {
          result.push({
            ...event,
            start: instanceStart,
            end: instanceEnd,
          });
        }
      }

      moveToNextOccurrence(current, event.repeat);
    }
  });

  return result;
}

/* ==================================================
   イベントを日付ごとにグループ化
   日をまたぐイベントは各日に分割して登録する
================================================== */
export function groupEventsByDay(
  events: CalendarEvent[],
): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();

  events.forEach((event) => {
    const current = new Date(event.start);
    let guard = 0;

    while (current <= event.end && guard < MAX_REPEAT_COUNT) {
      guard++;

      const dayStart = new Date(current);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(current);
      dayEnd.setHours(23, 59, 59, 999);

      const key = getDateKey(current);

      const splitEvent: CalendarEvent = {
        ...event,
        start: event.start > dayStart ? event.start : dayStart,
        end: event.end < dayEnd ? event.end : dayEnd,
      };

      const list = map.get(key) ?? [];
      map.set(key, [...list, splitEvent]);

      current.setDate(current.getDate() + 1);
      current.setHours(0, 0, 0, 0);
    }
  });

  return map;
}
