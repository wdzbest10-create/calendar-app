import { z } from "zod";

export const eventSchema = z
  .object({
    title: z
      .string()
      .min(1, "タイトルを入力してください")
      .max(50, "50文字以内で入力してください"),
    startDate: z.string().min(1, "開始日を入力してください"),
    startHour: z.number().min(0).max(23),
    startMinute: z.number().min(0).max(59),
    endDate: z.string().min(1, "終了日を入力してください"),
    endHour: z.number().min(0).max(23),
    endMinute: z.number().min(0).max(59),
    location: z.string().max(30, "30文字以内で入力してください"),
    description: z.string().max(200, "200文字以内で入力してください"),
    category: z.string().min(1, "カテゴリを入力してください"),
    color: z.enum(["blue", "red", "green", "yellow", "purple"]),
    repeatType: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
    repeatInterval: z.number(),
    allDay: z.boolean(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      start.setHours(data.startHour, data.startMinute, 0, 0);

      const end = new Date(data.endDate);
      end.setHours(data.endHour, data.endMinute, 0, 0);

      return end >= start;
    },
    {
      message: "終了日時は開始日時より後にしてください",
      path: ["endDate"],
    },
  );

export type EventForm = z.infer<typeof eventSchema>;
