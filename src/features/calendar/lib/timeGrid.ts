/* ==================================================
   TimeGrid の列幅設定を生成
   左端は時刻列、右側は日付列
================================================== */
export function getTimeGridColumns(daysCount: number) {
  const timeColumnWidth = daysCount >= 7 ? 44 : 60;
  const minDayWidth = daysCount >= 7 ? 40 : daysCount === 3 ? 80 : 120;

  return `${timeColumnWidth}px repeat(${daysCount}, minmax(${minDayWidth}px, 1fr))`;
}
