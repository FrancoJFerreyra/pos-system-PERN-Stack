import { showSuccessToast } from "@/shared/utils/toast.utils";
import { useProducts } from "../hooks/useProducts";
import type {
  Product,
  ProductFormInput,
  ProductForm as ProductFormType,
} from "../types/product";
import ProductForm from "./ProductForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type Props = {
  id: string;
};

const formatProduct = (product: Product): ProductFormInput => {
  return {
    name: product?.name ?? "",
    sku: product?.sku,
    taxRate: product?.taxRate ?? 0,
    categoryId: product?.categoryId ?? null,
    description: product?.description ?? "",
    isActive: product?.isActive,
    price: product?.price?.toString() ?? "",
  };
};

const ProductUpdate = ({ id }: Props) => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const onUpdateSuccess = () => {
    showSuccessToast(t("form.toast.success.update"));
    navigate(`/products`);
  };

  const { useUpdate, useDetail } = useProducts({ onUpdateSuccess });
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
