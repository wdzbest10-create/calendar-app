"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";

type Props = {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
};

export default function EventDetailFields({ register, errors }: Props) {
  return (
    <>
      <input
        {...register("location")}
        placeholder="場所"
        className="w-full border rounded px-3 py-2"
      />

      {errors.location && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}

      <textarea
        {...register("description")}
        placeholder="詳細"
        className="w-full border rounded px-3 py-2"
      />

      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
    </>
  );
}
