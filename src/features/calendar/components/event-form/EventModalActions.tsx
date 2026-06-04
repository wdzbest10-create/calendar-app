"use client";

type Props = {
  mode: "create" | "edit";
  onCancel: () => void;
  onDelete: () => void;
};

export default function EventModalActions({ mode, onCancel, onDelete }: Props) {
  return (
    <div className="flex justify-between">
      {mode === "edit" ? (
        <button type="button" onClick={onDelete} className="text-red-500">
          削除
        </button>
      ) : (
        <div />
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border rounded"
        >
          キャンセル
        </button>

        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          保存
        </button>
      </div>
    </div>
  );
}
