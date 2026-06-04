"use client";

import EventDateTimeFields from "@/features/calendar/components/event-form/EventDateTimeFields";
import EventCategoryField from "@/features/calendar/components/event-form/EventCategoryField";
import EventRepeatField from "@/features/calendar/components/event-form/EventRepeatField";
import EventColorField from "@/features/calendar/components/event-form/EventColorField";
import EventDetailFields from "@/features/calendar/components/event-form/EventDetailFields";
import EventModalActions from "@/features/calendar/components/event-form/EventModalActions";
import { useEventModal } from "@/features/calendar/hooks/useEventModal";

type Props = { clearResizePreview?: () => void };

export default function EventModal({ clearResizePreview = () => {} }: Props) {
  const {
    mode,
    register,
    handleSubmit,
    errors,
    setValue,
    selectedColor,
    repeatType,
    onSubmit,
    handleClose,
    handleDelete,
  } = useEventModal({ clearResizePreview });

  if (!mode) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl p-5 w-[92vw] max-w-96 max-h-[90vh] 
        overflow-y-auto space-y-4 shadow-xl"
      >
        {/* タイトル */}
        <input
          {...register("title", { required: "タイトル必須" })}
          placeholder="タイトル"
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}

        {/* 日時 */}
        <EventDateTimeFields register={register} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("allDay")} />
          終日イベント
        </label>

        {/* カテゴリ */}
        <EventCategoryField register={register} />
        <EventRepeatField register={register} repeatType={repeatType} />
        <EventDetailFields register={register} errors={errors} />
        <EventColorField selectedColor={selectedColor} setValue={setValue} />

        {/* ボタン */}
        <EventModalActions
          mode={mode}
          onCancel={handleClose}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
