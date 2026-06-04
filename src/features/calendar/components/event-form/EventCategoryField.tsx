"use client";

import { UseFormRegister } from "react-hook-form";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import { EVENT_CATEGORIES } from "@/features/calendar/constants/categories";

type Props = {
  register: UseFormRegister<EventForm>;
};

export default function EventCategoryField({ register }: Props) {
  return (
    <select
      {...register("category")}
      className="w-full border rounded px-3 py-2"
    >
      {EVENT_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
