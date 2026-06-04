"use client";

import CategoryFilter from "@/features/calendar/components/filters/CategoryFilter";
import DateRangeFilter from "@/features/calendar/components/filters/DateRangeFilter";

export default function MobileFilters() {
  return (
    <div className="md:hidden border-t bg-gray-50 p-3 space-y-3">
      <CategoryFilter />
      <DateRangeFilter />
    </div>
  );
}
