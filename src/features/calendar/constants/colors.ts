import { EventColor } from "@/features/calendar/types/calendar";

export const EVENT_COLORS: EventColor[] = [
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
];

export const DEFAULT_EVENT_COLOR: EventColor = "blue";

export const colorMap: Record<EventColor, string> = {
  blue: "bg-blue-400",
  red: "bg-red-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
};
