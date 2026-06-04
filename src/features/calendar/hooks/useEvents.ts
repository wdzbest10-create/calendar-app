"use client";

import { useEffect } from "react";
import { atom, useAtom } from "jotai";

import { CalendarEvent } from "@/features/calendar/types/calendar";

const STORAGE_KEY = "calendar-events";

// -----------------------------
// 🔵 atom
// -----------------------------
const eventsAtom = atom<CalendarEvent[]>([]);
const loadedAtom = atom(false);

// -----------------------------
// 🔵 localStorage load
// -----------------------------
function parseEvents(raw: string): CalendarEvent[] {
  try {
    const parsed = JSON.parse(raw) as CalendarEvent[];

    return parsed
      .filter((e) => e.id)
      .map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
        repeat: e.repeat
          ? {
              ...e.repeat,
              until: e.repeat.until ? new Date(e.repeat.until) : undefined,
            }
          : undefined,
        exceptions: e.exceptions?.map((ex) => ({
          ...ex,
          modified: ex.modified
            ? {
                ...ex.modified,
                start: ex.modified.start
                  ? new Date(ex.modified.start)
                  : undefined,
                end: ex.modified.end ? new Date(ex.modified.end) : undefined,
                repeat: ex.modified.repeat
                  ? {
                      ...ex.modified.repeat,
                      until: ex.modified.repeat.until
                        ? new Date(ex.modified.repeat.until)
                        : undefined,
                    }
                  : undefined,
              }
            : undefined,
        })),
      }));
  } catch {
    return [];
  }
}

// -----------------------------
// 🔵 hook
// -----------------------------
export function useEvents() {
  const [events, setEvents] = useAtom(eventsAtom);
  const [loaded, setLoaded] = useAtom(loadedAtom);

  // -----------------------------
  // 🟡 初回ロード
  // -----------------------------
  useEffect(() => {
    if (loaded) return;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      setLoaded(true);
      return;
    }

    setEvents(parseEvents(raw));
    setLoaded(true);
  }, [loaded, setEvents, setLoaded]);

  // -----------------------------
  // 🟡 保存
  // -----------------------------
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events, loaded]);

  return {
    events,
    setEvents,
    loaded,
  };
}
