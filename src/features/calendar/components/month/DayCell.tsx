"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import EventItem from "./EventItem";
import { getWeekendTextColor } from "@/features/calendar/lib/weekend";
import { getHolidayName } from "@/features/calendar/lib/holiday";

type Props = {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  onClick: () => void;
  onEditEvent: (event: CalendarEvent) => void;
};

export default function DayCell({
  date,
  isToday,
  isCurrentMonth,
  events,
  onClick,
  onEditEvent,
}: Props) {
  const weekendTextColor = getWeekendTextColor(date);
  const holidayName = getHolidayName(date);

  return (
    <div
      className={`flex min-h-0 flex-col p-1 md:p-2 overflow-hidden transition border border-gray-200 hover:bg-gray-50    
      ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"}`}
      onClick={onClick}
    >
      {/* 日付 */}
      <div className="flex justify-end">
        <div
          className={`text-xs px-2 py-0.5 ${
            isToday ? "bg-blue-500 text-white rounded-full" : weekendTextColor
          }`}
        >
          {date.getDate()}
        </div>
      </div>

      {holidayName && (
        <div className="text-[10px] text-red-500 truncate text-right">
          {holidayName}
        </div>
      )}

      {/* イベント */}
      <div className="flex min-h-0 flex-col gap-1 mt-1">
        {events
          .filter((event) => event.id)
          .slice(0, 2)
          .map((event) => (
            <EventItem
              key={event.id}
              event={event}
              onClick={() => onEditEvent(event)}
            />
          ))}

        {events.length > 2 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="text-xs text-gray-500 text-left hover:underline"
          >
            他{events.length - 2}件
          </button>
        )}
      </div>
    </div>
  );
}
