"use client";

import { UseFormRegister } from "react-hook-form";
import { EventForm } from "@/features/calendar/schemas/eventFormSchema";
import DateTimeRow from "@/features/calendar/components/event-form/DateTimeRow";

type Props = {
  register: UseFormRegister<EventForm>;
};

export default function EventDateTimeFields({ register }: Props) {
  return (
    <div className="space-y-2">
      <DateTimeRow
        label="開始"
        register={register}
        dateField="startDate"
        hourField="startHour"
        minuteField="startMinute"
      />

      <DateTimeRow
        label="終了"
        register={register}
        dateField="endDate"
        hourField="endHour"
        minuteField="endMinute"
      />
    </div>
  );
}
