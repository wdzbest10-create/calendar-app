import { CalendarEvent } from "./calendar";

export type PositionedEvent = CalendarEvent & {
  column: number;
  totalColumns: number;
};

export type DayData = {
  date: Date;
  positioned: PositionedEvent[];
};
