import { useColorMode } from "@chakra-ui/react";
import "./App.css";
import { Billing } from "./Billings/Billing";
import { CustomerForm } from "./Customers/CustomerForm";

function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  // if (colorMode === "dark") {
  //   toggleColorMode();
  // }

  return (
    <div id="App">
      {/* <Billing /> */}
      <CustomerForm />
    </div>
  );
}

export default App;
