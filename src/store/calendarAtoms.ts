import { atom } from "jotai";
import { CalendarEvent } from "@/features/calendar/types/calendar";

export const viewAtom = atom<"month" | "week" | "day">("month");

const today = new Date();

export const currentDateAtom = atom(
  new Date(today.getFullYear(), today.getMonth(), today.getDate()),
);

export const selectedEventAtom = atom<CalendarEvent | null>(null);

export const draftEventAtom = atom<CalendarEvent | null>(null);

export const modeAtom = atom<"create" | "edit" | null>(null);

export const showAroundAtom = atom(false);

export const categoryFilterAtom = atom<string[]>([]);

// calendarAtoms.ts
export const searchAtom = atom("");

export const filterStartDateAtom = atom<string>("");
export const filterEndDateAtom = atom<string>("");
