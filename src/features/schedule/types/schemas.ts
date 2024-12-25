import { z } from "zod";

export const ScheduleInputsSchema = z.object({
  time: z.string().time(),
  date: z.date(),
  timezone: z.string(),
  repeat: z
    .object({
      daysOfWeek: z
        .array(
          z.enum([
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ])
        )
        .optional()
        .nullable(),

      end: z.date().or(z.number()).optional().nullable(),
      interval: z.number().optional().nullable(),
      frequency: z.enum([
        "none",
        "weekly",
        "hourly",
        "daily",
        "yearly",
        "monthly",
      ]),
    })
    .optional()
    .nullable(),
});

export type ScheduleInputs = z.infer<typeof ScheduleInputsSchema>;
