import { createPopulateQuerySchema } from "@/common/validations/common.schemas.js";
import { z } from "zod";

const PRODUCT_POPULATE_ENTITIES = ["category"] as const;

const populateQuerySchema = createPopulateQuerySchema(
  PRODUCT_POPULATE_ENTITIES,
);

const nameSchema = z.string().trim().min(1).max(120);
const skuSchema = z.string().trim().min(1).max(64);
const descriptionSchema = z.string().trim().max(600);
const priceSchema = z.coerce.number().positive();
const taxRateSchema = z.coerce.number().int().min(0).max(100);
const categoryIdSchema = z.coerce.number().int().nullable().optional();
const isActiveSchema = z.coerce.boolean().optional();

export const createProductSchema = z.object({
  categoryId: categoryIdSchema,
  description: descriptionSchema.optional(),
  name: nameSchema,
  price: priceSchema,
  taxRate: taxRateSchema,
  sku: skuSchema,
  isActive: isActiveSchema,
});

export const updateProductSchema = z.object({
  categoryId: categoryIdSchema,
  description: descriptionSchema.optional(),
  name: nameSchema.optional(),
  price: priceSchema.optional(),
  taxRate: taxRateSchema.optional(),
  sku: skuSchema.optional(),
  isActive: isActiveSchema,
});

export const getAllProductQuerySchema = z
  .object({
    categoryId: z.coerce.number().int().positive().optional(),
    isActive: z.coerce.boolean().optional(),
    maxPrice: priceSchema.optional(),
    minPrice: priceSchema.optional(),
    name: z.string().optional(),
    sku: z.string().optional(),
  })
  .extend(populateQuerySchema.shape)
  .refine(
    (data) =>
      !data.minPrice || !data.maxPrice || data.maxPrice >= data.minPrice,
    {
      message: "maxPrice must be greater or equal to minPrice",
      path: ["maxPrice"],
    },
  );

export const getByIdProductQuerySchema = populateQuerySchema;
