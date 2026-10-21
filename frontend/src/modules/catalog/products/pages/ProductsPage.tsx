import Container from "@/shared/components/container/Container";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { showErrorToast, showSuccessToast } from "@/shared/utils/toast.utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitle from "@/shared/components/page/PageTitle";
import { Button } from "@/shared/components/button/Button";
import { Plus } from "lucide-react";
import type { ApiError } from "@/shared/types/api";
import { getProductErrorMessage } from "../utils/productError.utils";

const ProductsPage = () => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const { useList, useRemove } = useProducts({
    params: {
      populate: "category",
    },
    onRemoveSuccess: () => {
      showSuccessToast(t("form.toast.success.remove"));
    },
    onError: (error: ApiError) => {
      showErrorToast(getProductErrorMessage(t, error));
    },
  });

  const { data } = useList();
  const { mutate: removeProduct } = useRemove();
  const onRemoveProduct = (id: number) => {
    removeProduct(id);
  };

  const onEditProduct = (id: number) => {
    navigate(`update/${id}`);
  };

  return (
    <Container className="gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle title={t("page.title")} />
        <Button
          startIcon={<Plus className="size-4" />}
          onClick={() => navigate("/products/create")}
        >
          {t("page.button.create")}
        </Button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              onRemoveProduct={onRemoveProduct}
              onEditProduct={onEditProduct}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProductsPage;
