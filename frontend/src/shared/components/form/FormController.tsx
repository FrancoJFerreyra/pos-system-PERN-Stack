import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type ControllerRenderProps,
} from "react-hook-form";

interface Props<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
> {
  children: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
  ) => React.ReactElement;
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: Path<TFieldValues>;
}

const FormController = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  children,
  control,
  name,
}: Props<TFieldValues, TTransformedValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => children(field)}
    />
  );
};

export default FormController;
