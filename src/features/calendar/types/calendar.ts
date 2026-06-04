import { RepeatRule } from "./recurrence";
import { EventException } from "./recurrence";

export type EventColor = "blue" | "red" | "green" | "yellow" | "purple";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  date: string;
  category: string;
  color: EventColor;
  location?: string;
  description?: string;
  repeat?: RepeatRule;
  exceptions?: EventException[];
  originalId?: string;
  allDay?: boolean;
};
