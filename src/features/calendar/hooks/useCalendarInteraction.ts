"use client";

import { useAtom } from "jotai";
import {
  selectedEventAtom,
  draftEventAtom,
  modeAtom,
} from "@/store/calendarAtoms";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { createDefaultEvent } from "@/features/calendar/lib/event";
import { updateCalendarEvent } from "@/features/calendar/lib/eventUpdate";

type Params = {
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
};

export function useCalendarInteraction({ setEvents }: Params) {
  const [, setSelectedEvent] = useAtom(selectedEventAtom);
  const [, setDraftEvent] = useAtom(draftEventAtom);
  const [, setMode] = useAtom(modeAtom);

  const handleCreateEvent = (date: Date, hour = 9) => {
    const newEvent = createDefaultEvent(date, hour);

    setSelectedEvent(newEvent);
    setDraftEvent(newEvent);
    setMode("create");
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setDraftEvent(event);
    setMode("edit");
  };

  const handleUpdateEvent = (updated: CalendarEvent) => {
    setEvents((prev) => updateCalendarEvent(prev, updated));

    setSelectedEvent(updated);
    setDraftEvent(updated);
  };

  return {
    handleCreateEvent,
    handleEditEvent,
    handleUpdateEvent,
  };
}
