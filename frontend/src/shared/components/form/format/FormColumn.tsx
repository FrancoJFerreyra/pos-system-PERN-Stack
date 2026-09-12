import { type ReactNode } from "react";
import * as styles from "./FormColumn.variants";

interface Props {
  children: ReactNode;
  variant?: styles.Variant;
}

const FormColumn = ({ children, variant }: Props) => {
  return <div className={styles.formColumn({ variant })}>{children}</div>;
};

export default FormColumn;
