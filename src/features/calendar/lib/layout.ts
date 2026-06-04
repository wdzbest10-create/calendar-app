import { CalendarEvent } from "@/features/calendar/types/calendar";
import { PositionedEvent } from "@/features/calendar/types/layout";

/* ==================================================
   2つのイベントが時間的に重なっているか判定
================================================== */
function isOverlapping(a: CalendarEvent, b: CalendarEvent) {
  return a.start < b.end && a.end > b.start;
}

/* ==================================================
   同じ時間帯に重なるイベントを横並びに配置
================================================== */
function layoutTimedGroup(events: CalendarEvent[]): PositionedEvent[] {
  const columns: CalendarEvent[][] = [];

  const positioned = events.map((event) => {
    let column = 0;

    while (
      columns[column]?.some((columnEvent) => isOverlapping(event, columnEvent))
    ) {
      column++;
    }

    if (!columns[column]) {
      columns[column] = [];
    }

    columns[column].push(event);

    return {
      ...event,
      column,
      totalColumns: 1,
    };
  });

  const totalColumns = columns.length;

  return positioned.map((event) => ({
    ...event,
    totalColumns,
  }));
}

/* ==================================================
   表示用イベント配置
   - 終日イベントは横並び計算しない
   - 時間指定イベントは重なりごとにグループ化する
================================================== */
export function layoutEvents(events: CalendarEvent[]): PositionedEvent[] {
  const allDayEvents: PositionedEvent[] = events
    .filter((event) => event.allDay)
    .map((event) => ({
      ...event,
      column: 0,
      totalColumns: 1,
    }));

  const timedEvents = events
    .filter((event) => !event.allDay)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const groups: CalendarEvent[][] = [];
  let currentGroup: CalendarEvent[] = [];
  let groupEnd: Date | null = null;

  timedEvents.forEach((event) => {
    const shouldStartNewGroup = !groupEnd || event.start >= groupEnd;

    if (shouldStartNewGroup) {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }

      currentGroup = [event];
      groupEnd = event.end;
      return;
    }

    currentGroup.push(event);

    if (groupEnd && event.end > groupEnd) {
      groupEnd = event.end;
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  const positionedTimedEvents = groups.flatMap((group) =>
    layoutTimedGroup(group),
  );

  return [...allDayEvents, ...positionedTimedEvents];
}
