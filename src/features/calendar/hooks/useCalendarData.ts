"use client";

import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";

import {
  categoryFilterAtom,
  searchAtom,
  filterStartDateAtom,
  filterEndDateAtom,
} from "@/store/calendarAtoms";

import { useEvents } from "@/features/calendar/hooks/useEvents";
import { groupEventsByDay } from "@/features/calendar/lib/calendar";
import { getDateKey } from "@/features/calendar/lib/date";
import { filterEvents } from "@/features/calendar/lib/filter";
import { expandRecurringEvents } from "@/features/calendar/lib/recurrence";
import { CalendarEvent } from "@/features/calendar/types/calendar";

/* ==================================================
   カレンダー表示用データをまとめて取得する Hook

   役割:
   1. localStorage のイベント取得
   2. 検索・カテゴリ・日付範囲フィルター適用
   3. 繰り返しイベント展開
   4. 日付ごとのイベントMap作成
================================================== */
export function useCalendarData() {
  const { events, setEvents } = useEvents();

  const [categories] = useAtom(categoryFilterAtom);
  const [search] = useAtom(searchAtom);
  const [startDate] = useAtom(filterStartDateAtom);
  const [endDate] = useAtom(filterEndDateAtom);

  const filteredEvents = useMemo(() => {
    return filterEvents(events, {
      categories,
      search,
      startDate,
      endDate,
    });
  }, [events, categories, search, startDate, endDate]);

  const expandedEvents = useMemo(() => {
    const rangeStart = new Date();
    rangeStart.setMonth(rangeStart.getMonth() - 1);

    const rangeEnd = new Date();
    rangeEnd.setFullYear(rangeEnd.getFullYear() + 2);

    return expandRecurringEvents(filteredEvents, rangeStart, rangeEnd);
  }, [filteredEvents]);

  const eventsByDay = useMemo(() => {
    return groupEventsByDay(expandedEvents);
  }, [expandedEvents]);

  const getEventsForDay = useCallback(
    (date: Date): CalendarEvent[] => {
      return eventsByDay.get(getDateKey(date)) ?? [];
    },
    [eventsByDay],
  );

  return {
    events: expandedEvents,
    setEvents,
    eventsByDay,
    getEventsForDay,
  };
}
