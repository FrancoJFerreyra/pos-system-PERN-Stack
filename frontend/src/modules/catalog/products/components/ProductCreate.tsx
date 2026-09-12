import { showSuccessToast } from "@/shared/utils/toast.utils";
import { useProducts } from "../hooks/useProducts";
import type { ProductForm as ProductFormType } from "../types/product";
import ProductForm from "./ProductForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ProductCreate = () => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const onCreateSuccess = () => {
    showSuccessToast(t("form.toast.success.create"));
    navigate(`/products`);
  };

  const { useCreate } = useProducts({ onCreateSuccess });
  const { mutate: createProduct } = useCreate();

  const onFormSubmit = (data: ProductFormType) => {
    createProduct(data);
  };

  return <ProductForm onFormSubmit={onFormSubmit} />;
};

export default ProductCreate;
