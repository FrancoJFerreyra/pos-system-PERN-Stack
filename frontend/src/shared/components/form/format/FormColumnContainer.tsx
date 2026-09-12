import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const FormColumnContainer = ({ children }: Props) => {
  return <div className="grid grid-cols-12 gap-4">{children}</div>;
};

export default FormColumnContainer;
