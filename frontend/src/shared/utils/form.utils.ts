type TranslateFn = (key: string) => string;

type FormFieldErrors = Record<string, { message?: string } | undefined>;

export const getFieldError = <TField extends string>(
  t: TranslateFn,
  errors: FormFieldErrors,
  field: TField,
  errorsPath = "form.errors",
): string | undefined => {
  const message = errors?.[field]?.message;
  if (!message) return undefined;

  console.log(`${errorsPath}.${field}.${message}`);

  return t(`${errorsPath}.${field}.${message}`);
};
