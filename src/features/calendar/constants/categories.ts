export const EVENT_CATEGORIES = ["予定", "誕生日", "タスク"] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export const DEFAULT_EVENT_CATEGORY: EventCategory = "予定";
