import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "../i18next";
import App from "./App.tsx";
import { ThemeProvider } from "./shared/contexts/ThemeProvider.tsx";
import { RouterProvider } from "react-router/dom";
import router from "./router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  </StrictMode>,
);
