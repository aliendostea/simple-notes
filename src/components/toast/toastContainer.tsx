import { Toaster } from "sonner";

export default function ToastContainer() {
  return (
    <Toaster
      duration={5000}
      toastOptions={{
        style: {
          background: "rgb(208, 247, 237)",
        },
      }}
    />
  );
}
