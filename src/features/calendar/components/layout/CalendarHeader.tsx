"use client";

import { useState } from "react";
import { useEvents } from "@/features/calendar/hooks/useEvents";
import { useCalendarInteraction } from "@/features/calendar/hooks/useCalendarInteraction";
import { useCalendarNavigation } from "@/features/calendar/hooks/useCalendarNavigation";
import { useCalendarShortcuts } from "@/features/calendar/hooks/useCalendarShortcuts";
import SearchToggle from "@/features/calendar/components/layout/SearchToggle";
import ViewSwitcher from "@/features/calendar/components/layout/ViewSwitcher";
import AroundToggle from "@/features/calendar/components/layout/AroundToggle";
import CreateEventButton from "@/features/calendar/components/layout/CreateEventButton";
import MobileFilters from "@/features/calendar/components/filters/MobileFilters";

function CalendarHeader() {
  // -----------------------------
  // ヘッダー内の表示状態
  // -----------------------------
  const [showFilters, setShowFilters] = useState(false);

  const { setEvents } = useEvents();
  const { handleCreateEvent } = useCalendarInteraction({ setEvents });

  const {
    currentDate,
    view,
    setView,
    title,
    handlePrev,
    handleNext,
    handleToday,
  } = useCalendarNavigation();

  // -----------------------------
  // 新規イベント作成
  // -----------------------------
  const handleCreate = () => {
    handleCreateEvent(currentDate);
  };

  // -----------------------------
  // キーボード操作
  // -----------------------------
  useCalendarShortcuts({
    onPrev: handlePrev,
    onNext: handleNext,
    onToday: handleToday,
  });

  return (
    <div>
      <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between md:p-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button onClick={handlePrev} className="px-2 py-1 border rounded">
            ←
          </button>

          <div className="text-base font-bold md:text-lg">{title}</div>

          <button onClick={handleNext} className="px-2 py-1 border rounded">
            →
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button
            onClick={handleToday}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            今日
          </button>

          <ViewSwitcher view={view} onChange={setView} />

          {view === "day" && <AroundToggle />}

          <SearchToggle />

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-2 py-1 border rounded text-sm"
          >
            フィルター
          </button>

          <CreateEventButton onClick={handleCreate} />
        </div>
      </div>

      {showFilters && <MobileFilters />}
    </div>
  );
}

export default CalendarHeader;
