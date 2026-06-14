"use client";

import { useAtom } from "jotai";
import { currentDateAtom, viewAtom } from "@/store/calendarAtoms";

import { useCalendarData } from "@/features/calendar/hooks/useCalendarData";
import { getMonthDays } from "@/features/calendar/lib/date";
import { isSameDay } from "@/features/calendar/lib/date";
import DayCell from "./DayCell";
import { WEEKDAYS } from "@/features/calendar/constants/calendar";
import { useCalendarInteraction } from "@/features/calendar/hooks/useCalendarInteraction";

export default function MonthView() {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const [, setView] = useAtom(viewAtom);

  const { getEventsForDay, setEvents } = useCalendarData();
  const { handleEditEvent } = useCalendarInteraction({ setEvents });

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // -----------------------------
  // 🟡 42マス生成
  // -----------------------------
  const totalCells = 42;
  const cells: { date: Date; isCurrentMonth: boolean }[] = [];

  const firstDayOffset = new Date(year, month, 1).getDay();

  // 前月
  for (let i = 0; i < firstDayOffset; i++) {
    const d = new Date(year, month, i - firstDayOffset + 1);
    cells.push({ date: d, isCurrentMonth: false });
  }

  // 今月
  const currentMonthDays = getMonthDays(year, month);
  currentMonthDays.forEach((d) => {
    cells.push({ date: d, isCurrentMonth: true });
  });

  // 次月
  while (cells.length < totalCells) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, isCurrentMonth: false });
  }

  // -----------------------------
  // 🟣 UI
  // -----------------------------
  return (
    <div className="h-full flex flex-col p-1 md:p-3 bg-gray-100">
      {/* 曜日 */}
      <div className="grid grid-cols-7 text-center text-xs md:text-sm font-medium mb-1 md:mb-2">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`py-1 ${i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : ""}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 本体 */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-px bg-gray-300 rounded-lg overflow-hidden">
        {cells.map(({ date, isCurrentMonth }) => {
          const isToday = isSameDay(date, today);
          const dayEvents = getEventsForDay(date);

          return (
            <DayCell
              key={date.toISOString()}
              date={date}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
              events={dayEvents}
              onEditEvent={handleEditEvent}
              onClick={() => {
                setCurrentDate(date);
                setView("day");
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
