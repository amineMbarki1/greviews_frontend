import { z } from "zod";

export const ListInputsSchema = z.object({
  name: z.string().min(1, "This field is required"),
});

export type ListInputs = z.infer<typeof ListInputsSchema>;

export const ContactInputsSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  phone: z.object({
    primary: z.object({
      number: z.string(),
      type: z.enum(["landline", "mobile"]),
    }),
    secondary: z
      .object({
        number: z.string(),
        type: z.enum(["landline", "mobile"]).optional(),
      })
      .optional(),
  }),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  list: z.string().min(1, "Select a list"),
});

export type ContactInputs = z.infer<typeof ContactInputsSchema>;
