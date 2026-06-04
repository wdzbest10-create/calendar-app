"use client";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { DayData } from "@/features/calendar/types/layout";
import { colorMap } from "@/features/calendar/constants/colors";
import { isSameDay } from "@/features/calendar/lib/date";
import { getHolidayName } from "@/features/calendar/lib/holiday";
import { getTimeGridColumns } from "@/features/calendar/lib/timeGrid";
import { getWeekendTextColor } from "@/features/calendar/lib/weekend";
import { WEEKDAYS } from "@/features/calendar/constants/calendar";

type Props = {
  dayData: DayData[];
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  onEditEvent: (event: CalendarEvent) => void;
};

export default function CalendarTopRow({
  dayData,
  currentDate,
  onSelectDate,
  onEditEvent,
}: Props) {
  const today = new Date();

  return (
    <div className="border-b bg-white">
      <div className="w-full">
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: getTimeGridColumns(dayData.length) }}
        >
          <div className="border-r bg-white" />

          {dayData.map(({ date, positioned }) => {
            const isTodayDate = isSameDay(date, today);
            const isSelected = isSameDay(date, currentDate);
            const weekendTextColor = getWeekendTextColor(date);
            const holidayName = getHolidayName(date);

            const previewEvents = positioned.slice(0, 3);
            const hiddenCount = positioned.length - previewEvents.length;

            return (
              <div
                key={date.toISOString()}
                className={`
                min-h-40 border-r p-2 cursor-default transition
                ${isTodayDate ? "bg-blue-50" : isSelected ? "bg-blue-50" : "bg-white"}
                hover:bg-gray-50
              `}
              >
                <div
                  onClick={() => onSelectDate(date)}
                  className="mb-2 flex items-center gap-2 font-bold cursor-pointer"
                >
                  <span
                    className={`
                    flex h-7 w-7 items-center justify-center rounded-full text-sm
                    ${isTodayDate ? "bg-blue-500 text-white" : weekendTextColor || "text-gray-800"}
                  `}
                  >
                    {date.getDate()}
                  </span>

                  <span
                    className={`
                    text-xs
                    ${isTodayDate ? "text-blue-600" : weekendTextColor || "text-gray-500"}
                  `}
                  >
                    {WEEKDAYS[date.getDay()]}
                  </span>

                  {holidayName && (
                    <span className="text-[10px] text-red-500 truncate">
                      {holidayName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  {previewEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        onEditEvent(event);
                      }}
                      className={`
                      truncate rounded px-2 py-0.5 text-left text-xs text-white
                      hover:opacity-80
                      ${colorMap[event.color]}
                    `}
                    >
                      {event.allDay ? (
                        <span className="mr-1">終日</span>
                      ) : (
                        <span className="mr-1">
                          {event.start.toLocaleTimeString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}

                      <span>{event.title || "(無題)"}</span>
                    </button>
                  ))}

                  {hiddenCount > 0 && (
                    <div className="text-xs text-gray-500">
                      他{hiddenCount}件
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
