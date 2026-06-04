"use client";

import { useMemo, useRef } from "react";
import { useAtom } from "jotai";
import { currentDateAtom, viewAtom } from "@/store/calendarAtoms";
import { useCalendarData } from "@/features/calendar/hooks/useCalendarData";
import { getTimeTop, getEventHeight } from "@/features/calendar/lib/time";
import useDragEvent from "@/features/calendar/hooks/useDragEvent";
import useResizeEvent from "@/features/calendar/hooks/useResizeEvent";
import { layoutEvents } from "@/features/calendar/lib/layout";
import { HOUR_HEIGHT, HOURS } from "@/features/calendar/constants/time";
import { useTimeGridScroll } from "@/features/calendar/hooks/useTimeGridScroll";
import { useTimeGridColumnWidth } from "@/features/calendar/hooks/useTimeGridColumnWidth";
import { useCalendarInteraction } from "@/features/calendar/hooks/useCalendarInteraction";

export function useWeekView() {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const [, setView] = useAtom(viewAtom);
  const { setEvents, getEventsForDay } = useCalendarData();

  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const weekDayData = useMemo(() => {
    return weekDays.map((date) => ({
      date,
      positioned: layoutEvents(getEventsForDay(date)),
    }));
  }, [weekDays, getEventsForDay]);

  const dayWidth = useTimeGridColumnWidth({
    gridRef,
    daysCount: 7,
  });

  const { handleCreateEvent, handleEditEvent, handleUpdateEvent } =
    useCalendarInteraction({ setEvents });

  useTimeGridScroll({
    scrollRef,
    hourHeight: HOUR_HEIGHT,
    topOffset: 160,
    trigger: currentDate.getTime(),
  });

  const { handleMouseDown, preview } = useDragEvent(handleUpdateEvent, {
    hourHeight: HOUR_HEIGHT,
    dayWidth,
  });

  const { handleResizeMouseDown, preview: resizePreview } = useResizeEvent({
    hourHeight: HOUR_HEIGHT,
    onChange: handleUpdateEvent,
  });

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
    setView("day");
  };

  return {
    currentDate,
    weekDayData,
    hours: HOURS,
    scrollRef,
    gridRef,
    preview,
    resizePreview,
    getTop: getTimeTop,
    getHeight: getEventHeight,
    handleCreateEvent,
    handleMouseDown,
    handleResizeMouseDown,
    handleSelectDate,
    handleEditEvent,
  };
}
