"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { PositionedEvent } from "@/features/calendar/types/layout";
import { colorMap } from "@/features/calendar/constants/colors";

type Props = {
  event: PositionedEvent;
  preview?: CalendarEvent | null;
  getTop: (date: Date) => number;
  getHeight: (start: Date, end: Date) => number;
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

export default function TimeEventBlock({
  event,
  preview,
  getTop,
  getHeight,
  onEditEvent,
  onMouseDown,
  onResizeMouseDown,
  showResizeHandle = false,
}: Props) {
  const displayEvent = preview && preview.id === event.id ? preview : event;
  const isPreview = preview?.id === event.id;
  const isOverlapped = event.totalColumns > 1;

  return (
    <div
      onMouseDown={(ev) => onMouseDown?.(event, ev)}
      onClick={(ev) => {
        ev.stopPropagation();
        onEditEvent(displayEvent);
      }}
      style={{
        top: getTop(displayEvent.start),
        height: getHeight(displayEvent.start, displayEvent.end),
        width: isOverlapped
          ? `calc(${100 / event.totalColumns}% - 2px)`
          : "calc(100% - 8px)",
        left: isOverlapped
          ? `calc(${(100 / event.totalColumns) * event.column}% + 4px)`
          : "4px",
      }}
      className={`
        absolute rounded-md px-2 py-1 text-xs text-white cursor-pointer 
        overflow-hidden border border-white/40 shadow-sm transition-all duration-150 ease-out
        hover:brightness-110 hover:shadow-md
        ${colorMap[event.color]}
        ${isPreview ? "z-30 scale-[1.02] opacity-90 ring-2 ring-white shadow-lg" : "z-10"}
      `}
    >
      <div className="truncate font-medium">
        {displayEvent.repeat?.type !== "none" && (
          <span className="mr-1">🔁</span>
        )}
        {displayEvent.title || "(無題)"}
      </div>

      <div className="text-[10px] opacity-90">
        {displayEvent.start.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        -
        {displayEvent.end.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {showResizeHandle && onResizeMouseDown && (
        <div
          className="absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize bg-black/20 hover:bg-black/40"
          onMouseDown={(ev) => {
            ev.stopPropagation();
            onResizeMouseDown(event, ev);
          }}
        />
      )}
    </div>
  );
}
