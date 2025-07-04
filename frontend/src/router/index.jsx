import { createBrowserRouter } from "react-router-dom";

// Impor semua komponen halaman dan layout
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../components/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ProductListPage from "../pages/ProductListPage";
import CreateProductPage from "../pages/CreateProductPage";
import EditProductPage from "../pages/EditProductPage";
import CustomerListPage from "../pages/CustomerListPage";
import CreateCustomerPage from "../pages/CreateCustomerPage";
import EditCustomerPage from "../pages/EditCustomerPage";
import TransactionListPage from "../pages/TransactionListPage";
import CreateSalePage from "../pages/CreateSalePage";

const router = createBrowserRouter([
  // Rute publik
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  // Rute Terproteksi
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      // ... Rute Produk ...
      { path: "/products", element: <ProductListPage /> },
      { path: "/products/create", element: <CreateProductPage /> },
      { path: "/products/edit/:id", element: <EditProductPage /> },
      // Rute Pelanggan
      { path: "/customers", element: <CustomerListPage /> },
      { path: "/customers/create", element: <CreateCustomerPage /> },
      { path: "/customers/edit/:id", element: <EditCustomerPage /> },
      // ... Rute Penjualan ...
      { path: "/sales", element: <TransactionListPage /> },
      { path: "/sales/create", element: <CreateSalePage /> },
    ]
  }
]);

export default router;