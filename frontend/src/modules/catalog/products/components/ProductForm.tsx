import { useForm } from "react-hook-form";
import type {
  ProductForm as ProductFormData,
  ProductFormInput,
} from "../types/product";
import { useTranslation } from "react-i18next";
import { FormInput, FormInputCurrency } from "@/shared/components/form";
import { Button } from "@/shared/components/button/Button";
import { generateSKU } from "../utils/product.utils";
import FormInputRate from "@/shared/components/form/FormInputRate";
import { RefreshCcw } from "lucide-react";
import FormColumnContainer from "@/shared/components/form/format/FormColumnContainer";
import FormColumn from "@/shared/components/form/format/FormColumn";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "../schemas/product.schema";
import { getFieldError } from "@/shared/utils/form.utils";
import { useEffect } from "react";

const DEFAULT_VALUES: ProductFormInput = {
  categoryId: null,
  description: "",
  isActive: true,
  name: "",
  price: "0.00",
  sku: "",
  taxRate: 0,
};

const parseUpdateValues = (product: ProductFormInput) => ({
  categoryId: product.categoryId ?? null,
  taxRate: product.taxRate ?? 0,
  price: product.price ?? "0.00",
  sku: product.sku ?? "",
  name: product.name ?? "",
  description: product.description ?? "",
  isActive: product.isActive ?? true,
});

const translatePath = "form.fields";

type Props = {
  product?: ProductFormInput;
  onFormSubmit: (data: ProductFormData) => void;
};

const ProductForm = ({ onFormSubmit, product }: Props) => {
  const { t } = useTranslation("products");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductFormInput, unknown, ProductFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(productFormSchema),
  });

  const onGenerateSKU = () => {
    const sku = generateSKU();
    setValue("sku", sku);
  };

  useEffect(() => {
    if (product) {
      reset(parseUpdateValues(product));
    }
  }, [product, reset]);

  return (
    <form
      id="product-form"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
      className="flex flex-col gap-12"
    >
      <FormColumnContainer>
        <FormColumn variant="half">
          <FormInput
            control={control}
            error={getFieldError(t, errors, "name")}
            label={t(`${translatePath}.name.label`)}
            name="name"
            placeholder={t(`${translatePath}.name.placeholder`)}
          />
          <FormInput
            control={control}
            error={getFieldError(t, errors, "description")}
            label={t(`${translatePath}.description.label`)}
            name="description"
            placeholder={t(`${translatePath}.description.placeholder`)}
          />
          <FormInputCurrency
            control={control}
            error={getFieldError(t, errors, "price")}
            label={t(`${translatePath}.price.label`)}
            name="price"
            placeholder={t(`${translatePath}.price.placeholder`)}
          />
        </FormColumn>
        <FormColumn variant="half">
          <FormInput
            control={control}
            endAdornment={
              <Button
                variant="ghost"
                color="secondary"
                type="button"
                size="icon"
                onClick={onGenerateSKU}
              >
                <RefreshCcw className="size-4" />
              </Button>
            }
            error={getFieldError(t, errors, "sku")}
            label={t(`${translatePath}.sku.label`)}
            name="sku"
            placeholder={t(`${translatePath}.sku.placeholder`)}
          />
          <FormInputRate
            control={control}
            error={getFieldError(t, errors, "taxRate")}
            label={t(`${translatePath}.taxRate.label`)}
            name="taxRate"
            placeholder={t(`${translatePath}.taxRate.placeholder`)}
          />
        </FormColumn>
      </FormColumnContainer>
      <Button className="w-1/2 mx-auto" size="lg">
        {product ? t("form.button.update") : t("form.button.create")}
      </Button>
    </form>
  );
};

export default ProductForm;
