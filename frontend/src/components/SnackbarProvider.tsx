import { createContext, useContext, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SnackbarContextType {
  showSnackbar: (message: string, type: "success" | "warning" | "error") => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const showSnackbar = (message: string, type: "success" | "warning" | "error") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warn(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
