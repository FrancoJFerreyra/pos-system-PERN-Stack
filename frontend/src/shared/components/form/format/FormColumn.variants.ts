import { tv } from "tailwind-variants";

export const formColumn = tv({
  base: ["flex flex-col gap-4 col-span-12"],
  variants: {
    variant: {
      half: "md:col-span-6",
      full: "",
    },
  },
  defaultVariants: {
    variant: "full",
  },
});

export type Variant = keyof typeof formColumn.variants.variant;
