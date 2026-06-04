"use client";

import { useLayoutEffect, useState } from "react";

type Params = {
  gridRef: React.RefObject<HTMLDivElement | null>;
  daysCount: number;
  timeColumnWidth?: number;
  defaultWidth?: number;
};

export function useTimeGridColumnWidth({
  gridRef,
  daysCount,
  timeColumnWidth = 60,
  defaultWidth = 120,
}: Params) {
  const [dayWidth, setDayWidth] = useState(defaultWidth);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const updateDayWidth = () => {
      const width = gridRef.current?.clientWidth ?? 0;
      const columnWidth = (width - timeColumnWidth) / daysCount;

      setDayWidth(columnWidth);
    };

    updateDayWidth();

    window.addEventListener("resize", updateDayWidth);

    return () => {
      window.removeEventListener("resize", updateDayWidth);
    };
  }, [gridRef, daysCount, timeColumnWidth]);

  return dayWidth;
}
