import { createBrowserRouter } from "react-router";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import ProductsPage from "./modules/catalog/products/pages/ProductsPage";
import ProductItemPage from "./modules/catalog/products/pages/ProductItemPage";
import CategoriesPage from "./modules/catalog/categories/pages/CategoriesPage";
import CategoryItemPage from "./modules/catalog/categories/pages/CategoryItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "products",
    element: <ProductsPage />,
  },
  {
    path: "products/create",
    element: <ProductItemPage />,
  },
  {
    path: "products/update/:id",
    element: <ProductItemPage />,
  },
  {
    path: "categories",
    element: <CategoriesPage />,
  },
  {
    path: "create",
    element: <CategoryItemPage />,
  },
  {
    path: "update/:id",
    element: <CategoryItemPage />,
  },
]);

export default router;
