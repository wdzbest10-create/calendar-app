"use client";

import { useAtom } from "jotai";
import { viewAtom, modeAtom, selectedEventAtom } from "@/store/calendarAtoms";

import MonthView from "./components/month/MonthView";
import WeekView from "./components/week/WeekView";
import DayView from "./components/day/DayView";
import EventModal from "./components/event-form/EventModal";
import CalendarHeader from "./components/layout/CalendarHeader";

function CalendarContainer() {
  const [view] = useAtom(viewAtom);
  const [mode] = useAtom(modeAtom);
  const [selectedEvent] = useAtom(selectedEventAtom);

  return (
    <div className="flex flex-col h-full w-full">
      <CalendarHeader />

      <main className="flex-1 overflow-hidden flex flex-col">
        {view === "month" && <MonthView />}
        {view === "week" && <WeekView />}
        {view === "day" && <DayView />}
      </main>

      {mode && <EventModal key={selectedEvent?.id || mode} />}
    </div>
  );
}

export default CalendarContainer;
