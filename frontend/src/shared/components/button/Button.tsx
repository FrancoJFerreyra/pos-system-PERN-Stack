import type { ReactNode, ButtonHTMLAttributes, JSX } from "react";
import * as styles from "./Button.variants";

const defaultLoadingSlot = (
  <span className="inline-flex shrink-0" aria-hidden>
    <span className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
  </span>
);

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  color?: styles.ButtonColor;
  variant?: styles.ButtonVariant;
  size?: styles.ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  loadingSlot?: ReactNode;
  startIcon?: ReactNode;
}

export const Button = ({
  children,
  className,
  color = "primary",
  variant = "solid",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  loadingSlot,
  startIcon,
  ...props
}: IButton): JSX.Element => {
  const isBusy = disabled || isLoading;
  return (
    <button
      {...props}
      className={styles.button({
        color,
        variant,
        size,
        fullWidth,
        disabled: isBusy,
        hasStartIcon: Boolean(startIcon),
        className,
      })}
      disabled={isBusy}
      aria-busy={isLoading || undefined}
    >
      {startIcon ? (
        <span className="inline-flex shrink-0">{startIcon}</span>
      ) : null}
      {isLoading ? (loadingSlot ?? defaultLoadingSlot) : children}
    </button>
  );
};
