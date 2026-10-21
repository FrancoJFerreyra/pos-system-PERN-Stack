import * as styles from "./Text.variants";

type TextAs =
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "blockquote"
  | "li"
  | "a";

type Props = {
  as: TextAs;
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
  htmlFor?: string;
  id?: string;
  variant?: styles.TextVariant;
};

const Text = ({
  as,
  className,
  children,
  variant = "heading1",
  htmlFor = "",
  "data-testid": dataTestId,
  id,
}: Props) => {
  const Tag = as;
  return (
    <Tag
      className={styles.text({ variant, className })}
      htmlFor={htmlFor}
      data-testid={dataTestId}
      id={id}
    >
      {children}
    </Tag>
  );
};

export default Text;
