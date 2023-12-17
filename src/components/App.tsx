import { useColorMode } from "@chakra-ui/react";
import "./App.css";
import Billing from "./Billings/Billing";
import CustomerForm from "./Customers/CustomerForm";
import { MenuBar } from "./Menu/MenuBar";
import { BillingDetails } from "./Billings/BillingDetails";
import ProductForm from "./Products/ProductForm";
import { SuppliersForm } from "./Suppliers/SuppliersForm";

function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  if (colorMode !== "dark") {
    toggleColorMode();
  }

  return (
    <div id="App">
      {/* <Billing /> */}
      {/* <ProductForm /> */}
      {/* <CustomerForm /> */}
      {/* <MenuBar /> */}
      {/* <SuppliersForm /> */}
    </div>
  );
}

export default App;
