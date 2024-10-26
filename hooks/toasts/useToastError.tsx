import { Alert } from "flowbite-react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { HiInformationCircle } from "react-icons/hi";

export const useToastError = () => {
  const showErrorToast = useCallback((message) => {
    toast.custom((t) => (
      <Alert color="failure" icon={HiInformationCircle} withBorderAccent>
        <span className="font-medium"> {message} </span>
      </Alert>
    ), {
      position: "top-right", 
    });
  }, []);

  return { showErrorToast };
};
