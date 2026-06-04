"use client";

import { useDayView } from "@/features/calendar/hooks/useDayView";
import TimeGrid from "@/features/calendar/components/time-grid/TimeGrid";
import CalendarTopRow from "@/features/calendar/components/layout/CalendarTopRow";
import { useTimeGridScroll } from "@/features/calendar/hooks/useTimeGridScroll";
import { HOUR_HEIGHT } from "@/features/calendar/constants/time";

function DayView() {
  const {
    currentDate,
    setCurrentDate,
    hours,
    dayData,
    getTop,
    getHeight,
    scrollRef,
    handleMouseDown,
    preview,
    handleResizeMouseDown,
    resizePreview,
    handleCreateEvent,
    handleEditEvent,
  } = useDayView();

  useTimeGridScroll({
    scrollRef,
    hourHeight: HOUR_HEIGHT,
    topOffset: 160,
    trigger: currentDate.getTime(),
  });

  // -----------------------------
  // 🟣 UI
  // -----------------------------
  return (
    <div className="h-full bg-gray-100 px-1 py-2 md:px-4 md:py-3">
      <div
        className={`h-full min-h-0 overflow-hidden rounded-lg md:rounded-xl border bg-white shadow-sm flex flex-col
      ${dayData.length === 1 ? "mx-auto w-full max-w-xl" : dayData.length === 3 ? "mx-auto max-w-6xl" : ""}`}
      >
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="sticky top-0 z-30">
            <CalendarTopRow
              dayData={dayData}
              currentDate={currentDate}
              onSelectDate={setCurrentDate}
              onEditEvent={handleEditEvent}
            />
          </div>

          <TimeGrid
            dayData={dayData}
            hours={hours}
            preview={resizePreview ?? preview}
            getTop={getTop}
            getHeight={getHeight}
            onCreateEvent={handleCreateEvent}
            onEditEvent={handleEditEvent}
            onMouseDown={handleMouseDown}
            onResizeMouseDown={handleResizeMouseDown}
            showResizeHandle
          />
        </div>
      </div>
    </div>
  );
}

export default DayView;
