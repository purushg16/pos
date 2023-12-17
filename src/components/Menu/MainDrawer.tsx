import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  SimpleGrid,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";
import {
  BsBox,
  BsBoxArrowDown,
  BsCalculator,
  BsCalendarCheck,
  BsKanban,
  BsPersonBadgeFill,
} from "react-icons/bs";
import {
  MdCategory,
  MdOutlinePersonAdd,
  MdPersonAdd,
  MdPersonAddAlt,
  MdPersonAddAlt1,
  MdPersonPinCircle,
} from "react-icons/md";
import { IconType } from "react-icons";
import { BsPersonPlusFill } from "react-icons/bs";

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
  "Add Employee": ["/addSupplier", BsPersonBadgeFill],
  "Add Category": ["/addSupplier", MdCategory],
};

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
