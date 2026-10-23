import Container from "@/shared/components/container/Container";
import { useCategories } from "../hooks/useCategories";
import CategoryCard from "../components/CategoryCard";
import { showErrorToast, showSuccessToast } from "@/shared/utils/toast.utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitle from "@/shared/components/page/PageTitle";
import { Button } from "@/shared/components/button/Button";
import { Plus } from "lucide-react";
import type { ApiError } from "@/shared/types/api";
import { getCategoryErrorMessage } from "../utils/categoryError.utils";

const CategoriesPage = () => {
  const { t } = useTranslation("categories");
  const navigate = useNavigate();
  const { useList, useRemove } = useCategories({
    onRemoveSuccess: () => {
      showSuccessToast(t("form.toast.success.remove"));
    },
    onError: (error: ApiError) => {
      showErrorToast(getCategoryErrorMessage(t, error));
    },
  });

  const { data } = useList();
  const { mutate: removeCategory } = useRemove();

  const onRemoveCategory = (id: number) => {
    removeCategory(id);
  };

  const onEditCategory = (id: number) => {
    navigate(`update/${id}`);
  };

  return (
    <Container className="gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle title={t("page.title")} />
        <Button
          startIcon={<Plus className="size-4" />}
          onClick={() => navigate("/categories/create")}
        >
          {t("page.button.create")}
        </Button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.map((category) => (
          <li key={category.id}>
            <CategoryCard
              category={category}
              onRemoveCategory={onRemoveCategory}
              onEditCategory={onEditCategory}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CategoriesPage;
