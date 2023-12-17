import { createBrowserRouter } from "react-router-dom";
import Billing from "../components/Billings/Billing";
import CustomerForm from "../components/Customers/CustomerForm";
import { ErrorPage } from "../components/ErrorPage";
import ProductForm from "../components/Products/ProductForm";
import { SuppliersForm } from "../components/Suppliers/SuppliersForm";
import Layout from "../components/Layout";

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
    ],
  },
]);

export default router;
