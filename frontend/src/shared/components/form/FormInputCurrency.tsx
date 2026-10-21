import { type Control, type FieldValues, type Path } from "react-hook-form";
import * as styles from "./fields/Input.variants";
import type { ReactNode } from "react";
import FormErrorMessage from "./FormErrorMessage";
import FormController from "./FormController";
import FormField from "./FormField";
import InputNumber from "./fields/InputNumber";

type Props<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformedValues>;
  endAddon?: ReactNode;
  error?: string;
  fullWidth?: boolean;
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  required?: boolean;
  startAddon?: ReactNode;
  variant?: styles.Variant;
};

const FormInputCurrency = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  control,
  endAddon,
  error,
  fullWidth = true,
  label,
  name,
  placeholder,
  required = false,
  startAddon,
  variant,
}: Props<TFieldValues, TTransformedValues>) => {
  const isFullWidth = fullWidth ? "w-full" : "";
  return (
    <div className={isFullWidth}>
      <FormController control={control} name={name}>
        {({ onChange, value }) => (
          <FormField
            invalid={!!error}
            name={name}
            label={label}
            startAddon={startAddon}
            endAddon={endAddon}
            required={required}
          >
            <div className={`${isFullWidth} flex flex-col gap-2`}>
              <InputNumber
                className={isFullWidth}
                formatOptions={{
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                variant={error ? "error" : variant}
              />
              {error && <FormErrorMessage error={error} />}
            </div>
          </FormField>
        )}
      </FormController>
    </div>
  );
};

export default FormInputCurrency;
