import { CalendarEvent } from "./calendar";

export type EventException = {
  date: string;
  type: "delete" | "modify";
  modified?: Partial<CalendarEvent>;
};

export type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export type RepeatRule = {
  type: RepeatType;
  interval: number;
  until?: Date;
};
