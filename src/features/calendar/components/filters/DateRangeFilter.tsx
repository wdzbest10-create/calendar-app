"use client";

import { useAtom } from "jotai";
import { filterStartDateAtom, filterEndDateAtom } from "@/store/calendarAtoms";

export default function DateRangeFilter() {
  const [startDate, setStartDate] = useAtom(filterStartDateAtom);
  const [endDate, setEndDate] = useAtom(filterEndDateAtom);

  return (
    <div className="space-y-2">
      <div className="font-bold text-sm">日付範囲</div>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
      />

      <button
        type="button"
        onClick={() => {
          setStartDate("");
          setEndDate("");
        }}
        className="text-xs text-gray-500 hover:underline"
      >
        日付範囲をクリア
      </button>
    </div>
  );
}
