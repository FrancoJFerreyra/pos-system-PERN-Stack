import { toast } from "sonner";

export const showSuccessToast = (message: string): void => {
  toast.success(message);
};

export const showInfoToast = (message: string): void => {
  toast.info(message);
};

export const showErrorToast = (message: string): void => {
  toast.error(message);
};
