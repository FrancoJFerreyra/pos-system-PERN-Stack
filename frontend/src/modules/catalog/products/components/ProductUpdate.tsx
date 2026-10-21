import { showErrorToast, showSuccessToast } from "@/shared/utils/toast.utils";
import { useProducts } from "../hooks/useProducts";
import type {
  Product,
  ProductFormInput,
  ProductForm as ProductFormType,
} from "../types/product";
import ProductForm from "./ProductForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { ApiError } from "@/shared/types/api";
import { getProductErrorMessage } from "../utils/productError.utils";

type Props = {
  id: string;
};

const formatProduct = (product?: Product): ProductFormInput | undefined => {
  if (!product) return undefined;

  return {
    name: product.name,
    sku: product.sku,
    taxRate: product.taxRate ?? 0,
    categoryId: product.categoryId ?? null,
    description: product.description ?? "",
    isActive: product.isActive,
    // The API stores cents; the form works with the decimal amount.
    price: product.price / 100,
  };
};

const ProductUpdate = ({ id }: Props) => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const onUpdateSuccess = () => {
    showSuccessToast(t("form.toast.success.update"));
    navigate(`/products`);
  };

  const { useUpdate, useDetail } = useProducts({
    onUpdateSuccess,
    onError: (error: ApiError) => {
      showErrorToast(getProductErrorMessage(t, error));
    },
  });
  const { mutate: updateProduct } = useUpdate(id);
  const { data: product } = useDetail(id);

  const onFormSubmit = (data: ProductFormType) => {
    updateProduct(data);
  };

  return (
    <ProductForm onFormSubmit={onFormSubmit} product={formatProduct(product)} />
  );
};

export default ProductUpdate;
