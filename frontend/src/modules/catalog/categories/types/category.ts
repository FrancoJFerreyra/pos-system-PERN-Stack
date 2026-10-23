import type { EntityDefault } from "../../../../shared/types/api";
import type { Product } from "../../products/types/product";

export type Category = EntityDefault & {
  name: string;
  products?: Product[];
};

export type {
  CategoryForm,
  CategoryFormInput,
} from "../schemas/category.schema";
