import type { EntityDefault } from "../../../../shared/types/api";
import type { Category } from "../../categories/types/category";

export interface Product extends EntityDefault {
  categoryId: number | null;
  description?: string | null;
  isActive: boolean;
  name: string;
  price: number;
  taxRate: number;
  sku: string;
  category: Category | null;
}

export type { ProductForm, ProductFormInput } from "../schemas/product.schema";
