import { tv } from "tailwind-variants";

export const text = tv({
  base: [""],
  variants: {
    variant: {
      heading1: "text-4xl font-bold tracking-tight",
      heading2: "text-3xl font-semibold tracking-tight",
      heading3: "text-2xl font-semibold tracking-tight",
      heading4: "text-xl font-semibold tracking-tight",
      heading5: "text-base font-semibold",
      heading6: "text-sm font-medium",

      subtitle: "text-base font-normal tracking-tight text-muted",

      body: "text-base leading-normal",
      bodyXs: "text-xs leading-relaxed",
      bodySmall: "text-sm leading-relaxed",
      bodyLarge: "text-lg leading-relaxed",

      label:
        "text-sm text-secondary leading-none tracking-tight block first-letter:uppercase",
      caption: "text-sm text-muted",
      overline: "text-sm uppercase tracking-widest font-semibold text-muted",
      muted: "text-sm text-muted",
      price: "text-sm font-semibold tracking-tight capitalize",
    },
  },
  defaultVariants: {
    variant: "heading1",
    disabled: false,
  },
});

export type TextVariant = keyof typeof text.variants.variant;
