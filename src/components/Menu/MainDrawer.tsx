import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  BsBox,
  BsCalculator,
  BsKanban,
  BsPersonBadgeFill,
  BsPersonPlusFill,
} from "react-icons/bs";
import { MdCategory, MdOutlinePersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const routes: { [key: string]: [route: string, icon: IconType] } = {
  Billing: ["/", BsCalculator],
  "Add Customer": ["/addCustomer", BsPersonPlusFill],
  "Add Product": ["/addProduct", BsBox],
  "Add Stock": ["/addSupplier", BsKanban],
  "Add Supplier": ["/addSupplier", MdOutlinePersonAdd],
  "Add Employee": ["/addEmployee", BsPersonBadgeFill],
  "Add Category": ["/addSupplier", MdCategory],
};

export default function MainDrawer({ isOpen, onClose }: Props) {
  const { toggleColorMode, colorMode } = useColorMode();

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
          <DrawerCloseButton size="lg" />
          <DrawerHeader>
            <Heading> Menu </Heading>
          </DrawerHeader>

          <DrawerBody padding={10}>
            <SimpleGrid columns={3} spacing={10} padding={10}>
              {Object.keys(routes).map((route, index) => (
                <Box boxShadow="dark-lg" borderRadius={20} key={index}>
                  <Link to={routes[route][0]} onClick={onClose}>
                    <MenuCard title={route} icon={routes[route][1]} />
                  </Link>
                </Box>
              ))}

              <Button
                height="100%"
                boxShadow="dark-lg"
                borderRadius={20}
                onClick={toggleColorMode}
                colorScheme="yellow"
              >
                Toggle Theme
              </Button>

              <Button
                height="100%"
                boxShadow="dark-lg"
                borderRadius={20}
                onClick={onClose}
                colorScheme="red"
              >
                Close
              </Button>
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
