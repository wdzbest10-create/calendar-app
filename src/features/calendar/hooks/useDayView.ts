"use client";

import { useMemo, useRef } from "react";
import { useAtom } from "jotai";

import { currentDateAtom, showAroundAtom } from "@/store/calendarAtoms";
import { useCalendarData } from "@/features/calendar/hooks/useCalendarData";
import { useCalendarInteraction } from "@/features/calendar/hooks/useCalendarInteraction";
import useDragEvent from "@/features/calendar/hooks/useDragEvent";
import useResizeEvent from "@/features/calendar/hooks/useResizeEvent";

import { addDays } from "@/features/calendar/lib/date";
import { getTimeTop, getEventHeight } from "@/features/calendar/lib/time";
import { layoutEvents } from "@/features/calendar/lib/layout";
import { HOUR_HEIGHT, HOURS } from "@/features/calendar/constants/time";

export function useDayView() {
  /* =========================================
     日表示で使う基本状態
  ========================================= */
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const [showAround] = useAtom(showAroundAtom);

  const { setEvents, getEventsForDay } = useCalendarData();

  const { handleCreateEvent, handleEditEvent, handleUpdateEvent } =
    useCalendarInteraction({
      setEvents,
    });

  /* =========================================
     表示する日付
     通常は1日だけ、前後表示ONの場合は3日表示
  ========================================= */
  const days = useMemo(() => {
    if (!showAround) {
      return [currentDate];
    }

    return [addDays(currentDate, -1), currentDate, addDays(currentDate, 1)];
  }, [currentDate, showAround]);

  /* =========================================
     日ごとのイベントを取得し、重なり表示用に配置計算する
  ========================================= */
  const dayData = useMemo(() => {
    return days.map((date) => ({
      date,
      positioned: layoutEvents(getEventsForDay(date)),
    }));
  }, [days, getEventsForDay]);

  /* =========================================
     時間グリッドのスクロール位置操作用
  ========================================= */
  const scrollRef = useRef<HTMLDivElement>(null);

  /* =========================================
     ドラッグ移動
  ========================================= */
  const { handleMouseDown, preview } = useDragEvent(handleUpdateEvent, {
    hourHeight: HOUR_HEIGHT,
    dayWidth: 120,
  });

  /* =========================================
     リサイズ変更
  ========================================= */
  const { handleResizeMouseDown, preview: resizePreview } = useResizeEvent({
    hourHeight: HOUR_HEIGHT,
    onChange: handleUpdateEvent,
  });

  return {
    currentDate,
    setCurrentDate,
    showAround,
    hours: HOURS,
    dayData,
    getTop: getTimeTop,
    getHeight: getEventHeight,
    scrollRef,
    handleMouseDown,
    preview,
    handleResizeMouseDown,
    resizePreview,
    handleCreateEvent,
    handleEditEvent,
  };
}
