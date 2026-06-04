"use client";

import { useCallback } from "react";
import { useAtom } from "jotai";
import { currentDateAtom, viewAtom } from "@/store/calendarAtoms";
import { addDays, addMonths } from "@/features/calendar/lib/date";

export function useCalendarNavigation() {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const [view, setView] = useAtom(viewAtom);

  /* =========================================
     現在表示中の日付情報
  ========================================= */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  /* =========================================
     週表示用の日付範囲
     ヘッダーに「6/1 - 6/7」のように表示するため
  ========================================= */
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  /* =========================================
     ヘッダー表示用タイトル
     表示モードによって表示内容を切り替える
  ========================================= */
  const title = (() => {
    if (view === "day") {
      return `${year}年${month + 1}月${day}日`;
    }

    if (view === "week") {
      return `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()} - ${
        endOfWeek.getMonth() + 1
      }/${endOfWeek.getDate()}`;
    }

    return `${year}年${month + 1}月`;
  })();

  /* =========================================
     前へ移動
     月表示は1ヶ月、週表示は7日、日表示は1日戻す
  ========================================= */
  const handlePrev = useCallback(() => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, -1));
      return;
    }

    if (view === "week") {
      setCurrentDate(addDays(currentDate, -7));
      return;
    }

    setCurrentDate(addDays(currentDate, -1));
  }, [currentDate, view, setCurrentDate]);

  /* =========================================
     次へ移動
     月表示は1ヶ月、週表示は7日、日表示は1日進める
  ========================================= */
  const handleNext = useCallback(() => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
      return;
    }

    if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
      return;
    }

    setCurrentDate(addDays(currentDate, 1));
  }, [currentDate, view, setCurrentDate]);

  /* =========================================
     今日へ移動
     時刻情報は不要なので 00:00 の日付だけを保存する
  ========================================= */
  const handleToday = useCallback(() => {
    const now = new Date();

    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }, [setCurrentDate]);

  return {
    currentDate,
    setCurrentDate,
    view,
    setView,
    title,
    handlePrev,
    handleNext,
    handleToday,
  };
}
