import { ScheduleInputsSchema } from "@/features/schedule/types/schemas";
import { z } from "zod";

export const TextMessageInputsSchema = z
  .object({
    lists: z.array(z.string()),
    contacts: z.array(z.string()),
    from: z.string(),
    content: z.string(),
  })
  .merge(ScheduleInputsSchema);

export type TextMessageInputs = z.infer<typeof TextMessageInputsSchema>;
