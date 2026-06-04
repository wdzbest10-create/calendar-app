import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";

import {
  selectedEventAtom,
  draftEventAtom,
  modeAtom,
} from "@/store/calendarAtoms";

import { CalendarEvent } from "@/features/calendar/types/calendar";
import { DragState } from "@/features/calendar/types/drag";
import { getDateKey } from "@/features/calendar/lib/date";

type Config = {
  hourHeight: number;
  dayWidth: number;
};

const SNAP_MINUTES = 30;

export default function useDragEvent(
  onChange: (event: CalendarEvent) => void,
  { hourHeight, dayWidth }: Config,
) {
  const [, setSelectedEvent] = useAtom(selectedEventAtom);
  const [, setDraftEvent] = useAtom(draftEventAtom);
  const [, setMode] = useAtom(modeAtom);

  const [preview, setPreview] = useState<CalendarEvent | null>(null);
  const [state, setState] = useState<DragState>(null);
  const previewRef = useRef<CalendarEvent | null>(null);

  const handleMouseDown = (event: CalendarEvent, e: React.MouseEvent) => {
    setSelectedEvent(event);
    setDraftEvent(event);

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    setState({
      event,
      startY: e.clientY,
      startX: e.clientX,
      originalStart: event.start,
      originalEnd: event.end,
    });

    previewRef.current = event;
  };

  useEffect(() => {
    if (!state) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diffY = e.clientY - state.startY;
      const diffX = e.clientX - state.startX;

      const rawMinutes = (diffY / hourHeight) * 60;
      const snappedMinutes =
        Math.round(rawMinutes / SNAP_MINUTES) * SNAP_MINUTES;

      const dayDiff = Math.round(diffX / dayWidth);

      const originalStart = new Date(state.originalStart);
      const originalEnd = new Date(state.originalEnd);
      const duration = originalEnd.getTime() - originalStart.getTime();

      const newStart = new Date(originalStart);
      newStart.setMinutes(newStart.getMinutes() + snappedMinutes);
      newStart.setDate(newStart.getDate() + dayDiff);

      const newEnd = new Date(newStart.getTime() + duration);

      const updated: CalendarEvent = {
        ...state.event,
        start: newStart,
        end: newEnd,
        date: getDateKey(newStart),
      };

      previewRef.current = updated;
      setPreview(updated);
    };

    const handleMouseUp = () => {
      const next = previewRef.current;

      if (
        next &&
        (next.start.getTime() !== state.event.start.getTime() ||
          next.end.getTime() !== state.event.end.getTime())
      ) {
        onChange(next);
        setSelectedEvent(next);
        setDraftEvent(next);
        setMode("edit");
      }

      setState(null);
      previewRef.current = null;
      setPreview(null);

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    state,
    onChange,
    hourHeight,
    dayWidth,
    setSelectedEvent,
    setDraftEvent,
    setMode,
  ]);

  return {
    handleMouseDown,
    preview,
  };
}
