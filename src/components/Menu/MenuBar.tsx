import { Box, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import MainDrawer from "./MainDrawer";
import { Link } from "react-router-dom";

export const MenuBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="absolute"
      transform="translateX(-50%)"
      left="50%"
      bottom={0}
      height="auto !important"
      width="100%"
      display="flex"
      justifyContent="center"
      borderBottom="6px solid teal"
    >
      <ButtonGroup size={"sm"} isAttached>
        <Button
          onClick={() => onOpen()}
          borderRadius={"20px 0 0 0"}
          size={"lg"}
          colorScheme="teal"
        >
          Menu
        </Button>
        <Link to="/">
          <Button borderRadius={"0 20px 0 0"} size={"lg"} colorScheme="gray">
            Billing
          </Button>
        </Link>
      </ButtonGroup>

      <MainDrawer onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
