"use client";

import { FieldPath, UseFormRegister } from "react-hook-form";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import { HOURS } from "@/features/calendar/constants/time";

const MINUTES = [0, 15, 30, 45];

type Props = {
  label: string;
  register: UseFormRegister<EventForm>;
  dateField: FieldPath<EventForm>;
  hourField: FieldPath<EventForm>;
  minuteField: FieldPath<EventForm>;
};

export default function DateTimeRow({
  label,
  register,
  dateField,
  hourField,
  minuteField,
}: Props) {
  return (
    <>
      <div className="text-sm font-medium">{label}</div>

      <div className="grid grid-cols-3 gap-2">
        <input
          type="date"
          {...register(dateField)}
          className="border rounded px-2 py-2"
        />

        <select
          {...register(hourField, { valueAsNumber: true })}
          className="border rounded px-2 py-2"
        >
          {HOURS.map((hour) => (
            <option key={hour} value={hour}>
              {String(hour).padStart(2, "0")}時
            </option>
          ))}
        </select>

        <select
          {...register(minuteField, { valueAsNumber: true })}
          className="border rounded px-2 py-2"
        >
          {MINUTES.map((minute) => (
            <option key={minute} value={minute}>
              {String(minute).padStart(2, "0")}分
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
