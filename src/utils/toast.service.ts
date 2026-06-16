import { toast, type TypeOptions } from "react-toastify";

class ToastService {
  showToast(
    message = "Something went wrong",
    type: TypeOptions = "error",
    toastId = "",

  ) {
    toast(message, {
      type,
      theme: "colored",
      position: "top-right",
      hideProgressBar: true,
      ...(toastId.length > 0 && { toastId }),
    });
  }
}

export const toastService = new ToastService();
