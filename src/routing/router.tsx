import { createBrowserRouter } from "react-router-dom";
import Billing from "../components/Billings/Billing";
import CustomerForm from "../components/Customers/CustomerForm";
import { ErrorPage } from "../components/ErrorPage";
import ProductForm from "../components/Products/ProductForm";
import { SuppliersForm } from "../components/Suppliers/SuppliersForm";
import Layout from "../components/Layout";
import EmployeeForm from "../components/Employee/EmployeeForm";
import CategoryForm from "../components/Category/CategoryForm";
import StockForm from "../components/Stock/StockForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Billing /> },
      { path: "/addCustomer", element: <CustomerForm /> },
      { path: "/addProduct", element: <ProductForm /> },
      { path: "/addSupplier", element: <SuppliersForm /> },
      { path: "/addEmployee", element: <EmployeeForm /> },
      { path: "/addCategory", element: <CategoryForm /> },
      { path: "/addStock", element: <StockForm /> },
    ],
  },
]);

export default router;
