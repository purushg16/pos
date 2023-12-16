import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
} from "@chakra-ui/react";
import { MenuContainer } from "./MenuContainer";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MainDrawer({ isOpen, onOpen, onClose }: Props) {
  return (
    <>
      <Drawer
        placement={"bottom"}
        onClose={onClose}
        isOpen={isOpen}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading> Menu </Heading>
          </DrawerHeader>

          <DrawerBody padding={10}>
            <MenuContainer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
