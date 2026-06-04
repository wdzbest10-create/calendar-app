"use client";

import { useAtom } from "jotai";
import { categoryFilterAtom } from "@/store/calendarAtoms";
import { EVENT_CATEGORIES } from "@/features/calendar/constants/categories";

export default function CategoryFilter() {
  const [selected, setSelected] = useAtom(categoryFilterAtom);

  const toggle = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  return (
    <div>
      <div className="font-bold mb-2">カテゴリ</div>

      {EVENT_CATEGORIES.map((category) => (
        <label key={category} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(category)}
            onChange={() => toggle(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
}
