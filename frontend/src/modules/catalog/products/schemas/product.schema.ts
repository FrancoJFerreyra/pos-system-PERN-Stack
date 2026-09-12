import { toCents } from "@/shared/utils/currency.utils";
import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "required" })
  .max(120, { message: "max" });
const skuSchema = z
  .string()
  .trim()
  .min(1, { message: "required" })
  .max(64, { message: "max" });
const descriptionSchema = z.string().trim().max(600, { message: "max" });
const priceSchema = z
  .string()
  .transform(toCents)
  .pipe(
    z.number().int({ message: "integer" }).positive({ message: "positive" }),
  );
const taxRateSchema = z.coerce
  .number({ error: "invalid" })
  .int({ message: "integer" })
  .min(0, { message: "min" })
  .max(100, { message: "max" });
const categoryIdSchema = z.coerce
  .number()
  .int()
  .nullable()
  .optional()
  .default(null);
const isActiveSchema = z.coerce.boolean().optional().default(true);

export const productFormSchema = z.object({
  categoryId: categoryIdSchema,
  description: descriptionSchema.optional(),
  name: nameSchema,
  price: priceSchema,
  sku: skuSchema,
  taxRate: taxRateSchema,
  isActive: isActiveSchema,
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductForm = z.output<typeof productFormSchema>;
