/* ==================================================
   週末判定
================================================== */
export function isSunday(date: Date) {
  return date.getDay() === 0;
}

export function isSaturday(date: Date) {
  return date.getDay() === 6;
}

/* ==================================================
   週末用の文字色クラスを取得
================================================== */
export function getWeekendTextColor(date: Date) {
  if (isSunday(date)) return "text-red-500";
  if (isSaturday(date)) return "text-blue-500";

  return "";
}
