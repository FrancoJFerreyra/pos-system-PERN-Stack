import { type Control, type FieldValues, type Path } from "react-hook-form";
import FormController from "./FormController";
import FormErrorMessage from "./FormErrorMessage";
import FormField from "./FormField";
import AsyncSelect, { type LoadOptions } from "./fields/AsyncSelect";

export type { AsyncSelectOption, LoadOptions } from "./fields/AsyncSelect";

type Props<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
> = {
  clearLabel: string;
  control: Control<TFieldValues, unknown, TTransformedValues>;
  emptyLabel: string;
  error?: string;
  label: string;
  loadingLabel: string;
  loadOptions: LoadOptions;
  name: Path<TFieldValues>;
  placeholder?: string;
  required?: boolean;
};

const FormAsyncSelect = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  clearLabel,
  control,
  emptyLabel,
  error,
  label,
  loadingLabel,
  loadOptions,
  name,
  placeholder,
  required = false,
}: Props<TFieldValues, TTransformedValues>) => {
  return (
    <div className="w-full">
      <FormController control={control} name={name}>
        {({ onChange, value }) => (
          <FormField
            invalid={!!error}
            name={name}
            label={label}
            required={required}
          >
            <div className="flex w-full flex-col gap-2">
              <AsyncSelect
                clearLabel={clearLabel}
                emptyLabel={emptyLabel}
                error={error}
                label={label}
                loadingLabel={loadingLabel}
                loadOptions={loadOptions}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                value={value as number | null | undefined}
              />
              {error && <FormErrorMessage error={error} />}
            </div>
          </FormField>
        )}
      </FormController>
    </div>
  );
};

export default FormAsyncSelect;
