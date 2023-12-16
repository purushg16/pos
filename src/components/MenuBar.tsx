import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import MainDrawer from "./MainDrawer";

export const MenuBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      display="flex"
      justifyContent="center"
      paddingY={4}
    >
      <Button onClick={() => onOpen()} m={4} color={"black"}>
        Open
      </Button>
      <MainDrawer onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
