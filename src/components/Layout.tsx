import { Outlet } from "react-router-dom";
import { MenuBar } from "./Menu/MenuBar";
import { Box, useColorMode } from "@chakra-ui/react";

const Layout = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  if (colorMode !== "dark") {
    toggleColorMode();
  }

  return (
    <>
      <MenuBar />
      <Box id="main" height="100%">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
