import { useResource } from "@/shared/hooks/useResource";
import type { Product } from "../types/product";

const PRODUCTS_RESOURCE = "products" as const;

export const useProducts = (
  options?: Parameters<typeof useResource<Product>>[1],
) => useResource<Product>(PRODUCTS_RESOURCE, options);
