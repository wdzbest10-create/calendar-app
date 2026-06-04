"use client";

import { useLayoutEffect } from "react";

type Params = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  hourHeight: number;
  topOffset?: number;
  trigger?: unknown;
};

export function useTimeGridScroll({
  scrollRef,
  hourHeight,
  topOffset = 0,
  trigger,
}: Params) {
  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    requestAnimationFrame(() => {
      if (!scrollRef.current) return;

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const y = topOffset + (currentMinutes / 60) * hourHeight;

      scrollRef.current.scrollTop = y - scrollRef.current.clientHeight * 0.4;
    });
  }, [scrollRef, hourHeight, topOffset, trigger]);
}
