"use client";

import { ViewMode } from "@/features/calendar/types/view";

type Props = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: "month", label: "月" },
  { value: "week", label: "週" },
  { value: "day", label: "日" },
];

export default function ViewSwitcher({ view, onChange }: Props) {
  return (
    <>
      {VIEW_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-2 md:px-3 py-1 text-sm border rounded ${
            view === option.value ? "bg-blue-500 text-white" : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </>
  );
}
