import { showErrorToast, showSuccessToast } from "@/shared/utils/toast.utils";
import { useCategories } from "../hooks/useCategories";
import type { CategoryForm as CategoryFormType } from "../types/category";
import CategoryForm from "./CategoryForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { ApiError } from "@/shared/types/api";
import { getCategoryErrorMessage } from "../utils/categoryError.utils";

const CategoryCreate = () => {
  const { t } = useTranslation("categories");
  const navigate = useNavigate();
  const onCreateSuccess = () => {
    showSuccessToast(t("form.toast.success.create"));
    navigate(`/categories`);
  };

  const { useCreate } = useCategories({
    onCreateSuccess,
    onError: (error: ApiError) => {
      showErrorToast(getCategoryErrorMessage(t, error));
    },
  });
  const { mutate: createCategory } = useCreate();

  const onFormSubmit = (data: CategoryFormType) => {
    createCategory(data);
  };

  return <CategoryForm onFormSubmit={onFormSubmit} />;
};

export default CategoryCreate;
