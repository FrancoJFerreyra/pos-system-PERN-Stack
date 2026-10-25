import { showErrorToast, showSuccessToast } from "@/shared/utils/toast.utils";
import { useCategories } from "../hooks/useCategories";
import type {
  Category,
  CategoryFormInput,
  CategoryForm as CategoryFormType,
} from "../types/category";
import CategoryForm from "./CategoryForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { ApiError } from "@/shared/types/api";
import { getCategoryErrorMessage } from "../utils/categoryError.utils";

type Props = {
  id: string;
};

const formatCategory = (category?: Category): CategoryFormInput | undefined => {
  if (!category) return undefined;

  return {
    name: category.name,
  };
};

const CategoryUpdate = ({ id }: Props) => {
  const { t } = useTranslation("categories");
  const navigate = useNavigate();
  const onUpdateSuccess = () => {
    showSuccessToast(t("form.toast.success.update"));
    navigate(`/categories`);
  };

  const { useUpdate, useDetail } = useCategories({
    onUpdateSuccess,
    onError: (error: ApiError) => {
      showErrorToast(getCategoryErrorMessage(t, error));
    },
  });
  const { mutate: updateCategory } = useUpdate(id);
  const { data: category } = useDetail(id);

  const onFormSubmit = (data: CategoryFormType) => {
    updateCategory(data);
  };

  return (
    <CategoryForm
      onFormSubmit={onFormSubmit}
      category={formatCategory(category)}
    />
  );
};

export default CategoryUpdate;
