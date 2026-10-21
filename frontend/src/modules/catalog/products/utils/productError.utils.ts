import type { ApiError } from "@/shared/types/api";

type TranslateFn = (key: string) => string;

export const getProductErrorMessage = (
  t: TranslateFn,
  error: ApiError,
): string => {
  switch (error.httpStatus) {
    case 400:
      return t("form.toast.error.badRequest");
    case 404:
      return t("form.toast.error.notFound");
    case 409:
      return t("form.toast.error.conflict");
    default:
      return t("form.toast.error.default");
  }
};
