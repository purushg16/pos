import { Outlet } from "react-router-dom";
import { MenuBar } from "./Menu/MenuBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
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
