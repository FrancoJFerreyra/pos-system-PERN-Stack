import { useForm } from "react-hook-form";
import type {
  CategoryForm as CategoryFormData,
  CategoryFormInput,
} from "../types/category";
import { useTranslation } from "react-i18next";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema } from "../schemas/category.schema";
import { getFieldError } from "@/shared/utils/form.utils";
import { useEffect } from "react";

const DEFAULT_VALUES: CategoryFormInput = {
  name: "",
};

const parseUpdateValues = (category: CategoryFormInput) => ({
  name: category.name ?? "",
});

type Props = {
  category?: CategoryFormInput;
  onFormSubmit: (data: CategoryFormData) => void;
};

const CategoryForm = ({ onFormSubmit, category }: Props) => {
  const { t } = useTranslation("categories");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CategoryFormInput, unknown, CategoryFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(categoryFormSchema),
  });

  useEffect(() => {
    if (category) {
      reset(parseUpdateValues(category));
    }
  }, [category, reset]);

  return (
    <form
      id="category-form"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
      className="flex flex-col gap-12"
    >
      <FormInput
        control={control}
        error={getFieldError(t, errors, "name")}
        label={t("form.fields.name.label")}
        name="name"
        placeholder={t("form.fields.name.placeholder")}
        required
      />
      <Button className="w-1/2 mx-auto" size="lg">
        {category ? t("form.button.update") : t("form.button.create")}
      </Button>
    </form>
  );
};

export default CategoryForm;
