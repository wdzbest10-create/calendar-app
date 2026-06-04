"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { colorMap } from "@/features/calendar/constants/colors";

type Props = {
  event: CalendarEvent;
  onClick?: () => void;
};

export default function EventItem({ event, onClick }: Props) {
  const startTime = event.start.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = event.end.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`text-xs text-white rounded px-1 truncate cursor-pointer hover:brightness-95
      ${colorMap[event.color]}`}
    >
      <span className="mr-1">
        {startTime}-{endTime}
      </span>

      <span>{event.title}</span>
    </div>
  );
}
