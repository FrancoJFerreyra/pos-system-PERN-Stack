import type { AsyncSelectOption } from "@/shared/components/form/FormAsyncSelect";
import { apiClient } from "@/shared/lib/apiClient";
import type { Category } from "../types/category";

export const loadCategoryOptions = async (
  filterText: string,
  signal?: AbortSignal,
): Promise<AsyncSelectOption[]> => {
  const { data } = await apiClient.get<{ data: Category[] }>(
    "/api/categories",
    {
      params: filterText ? { name: filterText } : undefined,
      signal,
    },
  );

  return data.data.map((category) => ({
    label: category.name,
    value: String(category.id),
  }));
};
