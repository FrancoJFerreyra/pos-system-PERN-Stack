import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "required" })
  .max(100, { message: "max" });

export const categoryFormSchema = z.object({
  name: nameSchema,
});

export type CategoryFormInput = z.input<typeof categoryFormSchema>;
export type CategoryForm = z.output<typeof categoryFormSchema>;
