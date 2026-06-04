"use client";

import { UseFormRegister } from "react-hook-form";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";

type Props = {
  register: UseFormRegister<EventForm>;
  repeatType: EventForm["repeatType"];
};

export default function EventRepeatField({ register, repeatType }: Props) {
  return (
    <>
      <select
        {...register("repeatType")}
        className="w-full border rounded px-3 py-2"
      >
        <option value="none">繰り返しなし</option>
        <option value="daily">毎日</option>
        <option value="weekly">毎週</option>
        <option value="monthly">毎月</option>
        <option value="yearly">毎年</option>
      </select>

      {repeatType !== "none" && (
        <div className="space-y-1">
          <label className="text-sm text-gray-600">繰り返し間隔</label>
          <input
            type="number"
            min={1}
            {...register("repeatInterval", {
              valueAsNumber: true,
            })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}
    </>
  );
}
