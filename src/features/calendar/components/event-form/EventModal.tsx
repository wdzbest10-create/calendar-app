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
    deleteConfirmType,
    confirmDelete,
    cancelDelete,
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
        {/* 繰り返し */}
        <EventRepeatField register={register} repeatType={repeatType} />
        {/* 詳細 */}
        <EventDetailFields register={register} errors={errors} />
        {/* 色 */}
        <EventColorField selectedColor={selectedColor} setValue={setValue} />

        {/* ボタン */}
        <EventModalActions
          mode={mode}
          onCancel={handleClose}
          onDelete={handleDelete}
        />
      </form>

      {deleteConfirmType === "normal" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-80 rounded-xl bg-white p-5 shadow-xl space-y-4">
            <div className="font-bold">イベントを削除しますか？</div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-3 py-1 border rounded"
              >
                キャンセル
              </button>

              <button
                type="button"
                onClick={() => confirmDelete()}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmType === "repeat" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-80 rounded-xl bg-white p-5 shadow-xl space-y-4">
            <div className="font-bold">繰り返しイベントを削除しますか？</div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => confirmDelete("one")}
                className="w-full px-3 py-2 border rounded text-left hover:bg-gray-100"
              >
                このイベントのみ削除
              </button>

              <button
                type="button"
                onClick={() => confirmDelete("future")}
                className="w-full px-3 py-2 border rounded text-left hover:bg-gray-100"
              >
                この日以降すべて削除
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-3 py-1 border rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
