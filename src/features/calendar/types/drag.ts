import { CalendarEvent } from "./calendar";

export type DragState = {
  event: CalendarEvent;

  startY: number;

  startX: number;

  originalStart: Date;

  originalEnd: Date;
} | null;
