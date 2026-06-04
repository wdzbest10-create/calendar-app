"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { DayData, PositionedEvent } from "@/features/calendar/types/layout";
import TimeColumn from "@/features/calendar/components/time-grid/TimeColumn";
import CurrentTimeLine from "@/features/calendar/components/time-grid/CurrentTimeLine";
import { getTimeGridColumns } from "@/features/calendar/lib/timeGrid";

type Props = {
  dayData: DayData[];
  hours: number[];
  preview?: CalendarEvent | null;
  getTop: (date: Date) => number;
  getHeight: (start: Date, end: Date) => number;
  onCreateEvent: (date: Date, hour: number) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onMouseDown?: (
    event: PositionedEvent,
    ev: React.MouseEvent<HTMLDivElement>,
  ) => void;
  onResizeMouseDown?: (
    event: PositionedEvent,
    ev: React.MouseEvent<HTMLDivElement>,
  ) => void;
  showResizeHandle?: boolean;
};

export default function TimeGrid({
  dayData,
  hours,
  preview,
  getTop,
  getHeight,
  onCreateEvent,
  onEditEvent,
  onMouseDown,
  onResizeMouseDown,
  showResizeHandle = false,
}: Props) {
  return (
    <div className="w-full">
      <div
        className="relative grid min-h-384 w-full"
        style={{ gridTemplateColumns: getTimeGridColumns(dayData.length) }}
      >
        <div className="border-r bg-white">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b px-1 text-xs text-gray-400"
            >
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {dayData.map(({ date, positioned }, index) => (
          <div key={date.toISOString()} className="relative">
            <CurrentTimeLine getTop={getTop} showLabel={index === 0} />

            <TimeColumn
              date={date}
              hours={hours}
              events={positioned.filter((event) => !event.allDay)}
              preview={preview}
              getTop={getTop}
              getHeight={getHeight}
              onCreateEvent={onCreateEvent}
              onEditEvent={onEditEvent}
              onMouseDown={onMouseDown}
              onResizeMouseDown={onResizeMouseDown}
              showResizeHandle={showResizeHandle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
