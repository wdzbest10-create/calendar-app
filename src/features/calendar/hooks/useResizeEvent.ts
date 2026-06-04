"use client";

import { useRef, useState } from "react";
import { useAtom } from "jotai";

import {
  selectedEventAtom,
  draftEventAtom,
  modeAtom,
} from "@/store/calendarAtoms";

import { CalendarEvent } from "@/features/calendar/types/calendar";

type Props = {
  hourHeight: number;
  onChange: (event: CalendarEvent) => void;
};

export default function useResizeEvent({ hourHeight, onChange }: Props) {
  const [, setSelectedEvent] = useAtom(selectedEventAtom);
  const [, setDraftEvent] = useAtom(draftEventAtom);
  const [, setMode] = useAtom(modeAtom);

  const [preview, setPreview] = useState<CalendarEvent | null>(null);

  const resizingEventRef = useRef<CalendarEvent | null>(null);
  const startYRef = useRef(0);
  const initialEndRef = useRef<Date | null>(null);
  const latestPreviewRef = useRef<CalendarEvent | null>(null);

  const handleResizeMouseDown = (
    event: CalendarEvent,
    ev: React.MouseEvent,
  ) => {
    ev.stopPropagation();

    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";

    resizingEventRef.current = event;
    initialEndRef.current = new Date(event.end);
    startYRef.current = ev.clientY;

    setSelectedEvent(event);
    setDraftEvent(event);

    const handleMouseMove = (moveEv: MouseEvent) => {
      if (!resizingEventRef.current || !initialEndRef.current) return;

      const deltaY = moveEv.clientY - startYRef.current;

      const rawMinutes = Math.round(deltaY / (hourHeight / 60));
      const minutes = Math.round(rawMinutes / 15) * 15;

      const updatedEnd = new Date(initialEndRef.current);
      updatedEnd.setMinutes(updatedEnd.getMinutes() + minutes);

      const minEnd = new Date(resizingEventRef.current.start);
      minEnd.setMinutes(minEnd.getMinutes() + 30);

      if (updatedEnd < minEnd) {
        updatedEnd.setTime(minEnd.getTime());
      }

      const updatedEvent = {
        ...resizingEventRef.current,
        end: updatedEnd,
      };

      latestPreviewRef.current = updatedEvent;
      setPreview(updatedEvent);
    };

    const handleMouseUp = () => {
      if (latestPreviewRef.current) {
        onChange(latestPreviewRef.current);
        setSelectedEvent(latestPreviewRef.current);
        setDraftEvent(latestPreviewRef.current);
        setMode("edit");
      }

      resizingEventRef.current = null;
      initialEndRef.current = null;
      latestPreviewRef.current = null;
      setPreview(null);

      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    handleResizeMouseDown,
    preview,
  };
}
