"use client";

import { useAtom } from "jotai";
import { showAroundAtom } from "@/store/calendarAtoms";

export default function AroundToggle() {
  const [showAround, setShowAround] = useAtom(showAroundAtom);

  return (
    <button
      onClick={() => setShowAround(!showAround)}
      className="px-2 md:px-3 py-1 text-sm border rounded bg-gray-200"
    >
      前後表示
    </button>
  );
}
