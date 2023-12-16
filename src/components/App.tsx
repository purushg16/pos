import { useColorMode } from "@chakra-ui/react";
import "./App.css";
import { Billing } from "./Billings/Billing";

function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  // if (colorMode === "dark") {
  //   toggleColorMode();
  // }

  return (
    <div id="App">
      <Billing />
      <></>
    </div>
  );
}

export default App;
