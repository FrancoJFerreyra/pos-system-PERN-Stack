import { useResource } from "@/shared/hooks/useResource";
import type { Category } from "../types/category";

const CATEGORIES_RESOURCE = "categories" as const;

export const useCategories = (
  options?: Parameters<typeof useResource<Category>>[1],
) => useResource<Category>(CATEGORIES_RESOURCE, options);
