"use client";

import MiniCalendar from "@/features/calendar/components/layout/MiniCalendar";
import CategoryFilter from "@/features/calendar/components/filters/CategoryFilter";
import DateRangeFilter from "@/features/calendar/components/filters/DateRangeFilter";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r p-3 gap-4 bg-gray-50">
      <MiniCalendar />
      <CategoryFilter />
      <DateRangeFilter />
    </aside>
  );
}
