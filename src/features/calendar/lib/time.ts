import { HOUR_HEIGHT } from "@/features/calendar/constants/time";

/* ==================================================
   時刻から縦位置(px)を計算
================================================== */
export function getTimeTop(date: Date) {
  const minutesFromStartOfDay = date.getHours() * 60 + date.getMinutes();

  return (minutesFromStartOfDay / 60) * HOUR_HEIGHT;
}

/* ==================================================
   イベントの表示高さ(px)を計算
================================================== */
export function getEventHeight(start: Date, end: Date) {
  const durationMinutes = (end.getTime() - start.getTime()) / 60000;

  return (durationMinutes / 60) * HOUR_HEIGHT;
}
