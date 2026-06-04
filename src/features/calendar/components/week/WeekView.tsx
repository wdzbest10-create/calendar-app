"use client";

import CalendarTopRow from "@/features/calendar/components/layout/CalendarTopRow";
import TimeGrid from "@/features/calendar/components/time-grid/TimeGrid";
import { useWeekView } from "@/features/calendar/hooks/useWeekView";

function WeekView() {
  const {
    currentDate,
    weekDayData,
    hours,
    scrollRef,
    gridRef,
    preview,
    resizePreview,
    getTop,
    getHeight,
    handleCreateEvent,
    handleMouseDown,
    handleResizeMouseDown,
    handleSelectDate,
    handleEditEvent,
  } = useWeekView();

  return (
    <div className="h-full bg-gray-100 px-1 py-2 md:px-4 md:py-3">
      <div className="h-full min-h-0 overflow-hidden rounded-lg md:rounded-xl border bg-white shadow-sm flex flex-col">
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="sticky top-0 z-30">
            <CalendarTopRow
              dayData={weekDayData}
              currentDate={currentDate}
              onSelectDate={handleSelectDate}
              onEditEvent={handleEditEvent}
            />
          </div>

          <div ref={gridRef}>
            <TimeGrid
              dayData={weekDayData}
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
    </div>
  );
}

export default WeekView;
