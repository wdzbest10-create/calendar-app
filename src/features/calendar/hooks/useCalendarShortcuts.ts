"use client";

import { useEffect } from "react";

type Params = {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function useCalendarShortcuts({ onPrev, onNext, onToday }: Params) {
  /* =========================================
     キーボードショートカット

     ← : 前へ
     → : 次へ
     t : 今日へ移動
  ========================================= */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      }

      if (e.key === "ArrowRight") {
        onNext();
      }

      if (e.key === "t") {
        onToday();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onPrev, onNext, onToday]);
}
