import {
  addDays as dateFnsAddDays,
  addMonths as dateFnsAddMonths,
  isSameDay as dateFnsIsSameDay,
  isToday as dateFnsIsToday,
  format,
} from "date-fns";

/* ==================================================
   日付比較
================================================== */
export function isSameDay(date1: Date, date2: Date) {
  return dateFnsIsSameDay(date1, date2);
}

export function isToday(date: Date) {
  return dateFnsIsToday(date);
}

/* ==================================================
   日付加算
================================================== */
export function addDays(date: Date, days: number) {
  return dateFnsAddDays(date, days);
}

export function addMonths(date: Date, months: number) {
  return dateFnsAddMonths(date, months);
}

/* ==================================================
   yyyy-MM-dd 形式のキー生成
================================================== */
export function getDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

/* ==================================================
   指定月の日付一覧を取得
================================================== */
export function getMonthDays(year: number, month: number) {
  const days: Date[] = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}
