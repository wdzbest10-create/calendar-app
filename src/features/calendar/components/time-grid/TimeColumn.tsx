"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { PositionedEvent } from "@/features/calendar/types/layout";
import TimeEventBlock from "@/features/calendar/components/time-grid/TimeEventBlock";

type Props = {
  date: Date;
  hours: number[];
  events: PositionedEvent[];
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

export default function TimeColumn({
  date,
  hours,
  events,
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
    <div className="relative border-r bg-white">
      {hours.map((hour) => (
        <div
          key={hour}
          onClick={() => onCreateEvent(date, hour)}
          className="h-16 border-b hover:bg-gray-50 cursor-pointer"
        />
      ))}

      {events.map((event) => (
        <TimeEventBlock
          key={event.id}
          event={event}
          preview={preview}
          getTop={getTop}
          getHeight={getHeight}
          onEditEvent={onEditEvent}
          onMouseDown={onMouseDown}
          onResizeMouseDown={onResizeMouseDown}
          showResizeHandle={showResizeHandle}
        />
      ))}
    </div>
  );
}
