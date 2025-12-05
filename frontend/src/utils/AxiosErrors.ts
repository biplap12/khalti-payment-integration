import toast from "react-hot-toast";
import { AxiosError } from "axios";

const AxiosToastError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};

export default AxiosToastError;
