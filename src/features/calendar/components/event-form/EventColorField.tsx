"use client";

import { UseFormSetValue } from "react-hook-form";
import { CalendarEvent } from "@/features/calendar/types/calendar";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import { EVENT_COLORS, colorMap } from "@/features/calendar/constants/colors";

type Props = {
  selectedColor: CalendarEvent["color"];
  setValue: UseFormSetValue<EventForm>;
};

export default function EventColorField({ selectedColor, setValue }: Props) {
  return (
    <div className="flex gap-2">
      {EVENT_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => setValue("color", color)}
          className={`w-6 h-6 rounded-full ${colorMap[color]} ${
            selectedColor === color ? "ring-2 ring-black" : ""
          }`}
        />
      ))}
    </div>
  );
}
