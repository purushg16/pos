import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  BsBox,
  BsCalculator,
  BsKanban,
  BsPersonBadgeFill,
  BsPersonPlusFill,
  BsToggles2,
} from "react-icons/bs";
import {
  MdCategory,
  MdOutlinePersonAdd,
  MdTheaterComedy,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const routes: {
  [key: string]: [route: string, icon: IconType, desc: string[]];
} = {
  Billing: ["/", BsCalculator, ["Perform Billing"]],
  "Add Customer": ["/addCustomer", BsPersonPlusFill, ["Add New Customers"]],
  "Add Product": ["/addProduct", BsBox, ["Add New Products"]],
  "Add Stock": ["/addStock", BsKanban, ["Add stock to existing Products Data"]],
  "Add Supplier": ["/addSupplier", MdOutlinePersonAdd, ["Add New Suppliers"]],
  "Add Employee": ["/addEmployee", BsPersonBadgeFill, ["Add New Employee"]],
  "Add Category": ["/addSupplier", MdCategory, ["Add New Categories"]],
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
            <SimpleGrid columns={2} alignItems="baseline">
              <Heading> Menu </Heading>
            </SimpleGrid>
          </DrawerHeader>

          <DrawerBody padding={10}>
            <SimpleGrid columns={3} spacing={10} padding={10}>
              {Object.keys(routes).map((route, index) => (
                <Box boxShadow="dark-lg" borderRadius={20} key={index}>
                  <Link to={routes[route][0]} onClick={onClose}>
                    <MenuCard
                      title={route}
                      icon={routes[route][1]}
                      desc={routes[route][2]}
                    />
                  </Link>
                </Box>
              ))}
              <Box
                boxShadow="dark-lg"
                borderRadius={20}
                cursor="pointer"
                onClick={toggleColorMode}
                background="blue.800"
              >
                <Flex padding={10} gap={8}>
                  <Icon
                    as={BsToggles2}
                    boxSize={12}
                    transform={"rotate(-10deg)"}
                  />
                  <Box flex={1}>
                    <Heading size="md"> Toggle Theme </Heading>
                    <Text color="gray" mt={1}>
                      Switch between themes
                    </Text>
                  </Box>
                </Flex>
              </Box>

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
