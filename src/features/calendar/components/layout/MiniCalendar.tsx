"use client";

import { useAtom } from "jotai";
import { currentDateAtom } from "@/store/calendarAtoms";
import {
  getMonthDays,
  isSameDay,
  addMonths,
} from "@/features/calendar/lib/date";
import { getWeekendTextColor } from "@/features/calendar/lib/weekend";
import { WEEKDAYS } from "@/features/calendar/constants/calendar";

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = getMonthDays(year, month);
  const firstDayOffset = new Date(year, month, 1).getDay();

  return (
    <div>
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setCurrentDate(addMonths(currentDate, -1))}>
          ←
        </button>

        <div className="text-sm font-bold">
          {year}年 {month + 1}月
        </div>

        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          →
        </button>
      </div>

      {/* 曜日 */}
      <div className="grid grid-cols-7 text-xs text-center mb-1">
        {WEEKDAYS.map((weekday, index) => (
          <div
            key={weekday}
            className={
              index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : ""
            }
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* 日付 */}
      <div className="grid grid-cols-7 text-xs">
        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <div key={index} />
        ))}

        {days.map((date) => {
          const isTodayDate = isSameDay(date, today);
          const isSelectedDate = isSameDay(date, currentDate);
          const weekendTextColor = getWeekendTextColor(date);

          return (
            <div
              key={date.toISOString()}
              onClick={() => setCurrentDate(date)}
              className={`p-1 text-center rounded cursor-pointer
                ${isSelectedDate ? "bg-blue-500 text-white" : weekendTextColor}
                ${isTodayDate ? "border border-blue-500" : ""}
                hover:bg-gray-200`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
