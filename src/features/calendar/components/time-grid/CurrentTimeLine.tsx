"use client";

import { useEffect, useState } from "react";

type Props = {
  getTop: (date: Date) => number;
  showLabel?: boolean;
};

export default function CurrentTimeLine({ getTop, showLabel = false }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeText =
    `${now.getHours()}:` + String(now.getMinutes()).padStart(2, "0");

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{ top: getTop(now) }}
    >
      <div className="relative flex items-center">
        {showLabel && (
          <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            {timeText}
          </div>
        )}

        <div className="h-0.5 w-full bg-red-500" />
      </div>
    </div>
  );
}
