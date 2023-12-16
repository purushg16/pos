import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useBillStore, { BillingEntry } from "../../functions/store/BillStore";
import useCustomer, { Customer } from "../../functions/store/customerStore";

export const BillingDetails = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [customer, setCustomer] = useState<Customer>();
  const selectCustomers = useCustomer((s) => s.selectCustomers);
  const selectedCustomers = useCustomer((s) => s.selectedCustomers);
  const BillEntries = useBillStore((s) => s.BillEntries);

  return (
    <Flex flexDirection={"column"} gap={2} height="95vh">
      <Box padding={2} border="1px solid #80808030" borderRadius={7}>
        <Heading size="1xl" mb={2}>
          {" "}
          Customer Details{" "}
        </Heading>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            width="100%"
            textAlign="left"
          >
            {customer?.name || "Select Customer"}
          </MenuButton>

          <MenuList width="100%">
            <Box paddingX={2} marginY={2}>
              <InputGroup width="100%">
                <InputLeftElement children={<BsSearch />} />
                <Input
                  ref={ref}
                  placeholder="Search Items..."
                  variant={"filled"}
                  borderRadius={7}
                  onChange={() => {
                    if (ref.current) {
                      selectCustomers(ref.current.value);
                    }
                  }}
                />
              </InputGroup>
            </Box>

            <VStack marginX={3} gap={3}>
              {selectedCustomers?.map((customer: Customer, index) => (
                <Button
                  width="100%"
                  marginX={2}
                  key={index}
                  onClick={() => {
                    setCustomer(customer);
                  }}
                >
                  {customer.name}
                </Button>
              ))}
            </VStack>
          </MenuList>
        </Menu>
      </Box>

      <Box padding={2} border="1px solid #80808030" borderRadius={7} flex="1">
        {BillEntries.length > 0 && (
          <React.Fragment>
            <SimpleGrid columns={2} my={2}>
              <Text size={"sm"}>Sub Total: </Text>
              <Text size={"sm"} textAlign="right">
                &#8377;{" "}
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.quantityPrice;
                }, 0)}
              </Text>
            </SimpleGrid>

            <SimpleGrid columns={2} my={2}>
              <Text size={"sm"}>Tax: </Text>
              <Text size={"sm"} textAlign="right">
                &#8377;{" "}
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.taxPrice;
                }, 0)}
              </Text>
            </SimpleGrid>

            <hr />

            <SimpleGrid columns={2} my={4}>
              <Heading size={"sm"}>
                Total:{" "}
                <small>
                  (items: {BillEntries.length}) (Quantity:
                  {BillEntries.reduce((acc, entry: BillingEntry) => {
                    return acc + entry.quantity;
                  }, 0)}
                  )
                </small>
              </Heading>
              <Text size={"sm"} textAlign="right">
                &#8377;{" "}
                {BillEntries.reduce((acc, entry: BillingEntry) => {
                  return acc + entry.total;
                }, 0)}
              </Text>
            </SimpleGrid>
          </React.Fragment>
        )}
      </Box>
      <Box padding={2} border="1px solid #80808030" borderRadius={7} flex={1}>
        <SimpleGrid columns={1} my={2}>
          <SimpleGrid columns={2} alignItems="baseline">
            <Text>Biller Name:</Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                // size={"sm"}
                textAlign="left"
                variant="outline"
              >
                John Doe
              </MenuButton>
              <MenuList>
                <MenuItem> John Doe </MenuItem>
                <MenuItem> Micheal</MenuItem>
                <MenuItem> David </MenuItem>
                <MenuItem>Marques</MenuItem>
              </MenuList>
            </Menu>
          </SimpleGrid>

          <SimpleGrid columns={2} alignItems="baseline" my={2}>
            <Text>Biller Name:</Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                // size={"sm"}
                textAlign="left"
                variant="outline"
              >
                John Doe
              </MenuButton>
              <MenuList>
                <MenuItem> John Doe </MenuItem>
                <MenuItem> Micheal</MenuItem>
                <MenuItem> David </MenuItem>
                <MenuItem>Marques</MenuItem>
              </MenuList>
            </Menu>
          </SimpleGrid>

          <SimpleGrid columns={2} alignItems="baseline" my={2}>
            <Text>Bill Type:</Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                // size={"sm"}
                textAlign="left"
                variant="outline"
              >
                Wholesale
              </MenuButton>
              <MenuList>
                <MenuItem> Wholesale </MenuItem>
                <MenuItem> Retail</MenuItem>
              </MenuList>
            </Menu>
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>Items Handled:</Text>
          <Switch id="item-handled" colorScheme="teal" />
        </SimpleGrid>

        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>Handler:</Text>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              // size={"sm"}
              textAlign="left"
              variant="outline"
            >
              John Doe
            </MenuButton>
            <MenuList>
              <MenuItem> John Doe </MenuItem>
              <MenuItem> Micheal</MenuItem>
              <MenuItem> David </MenuItem>
              <MenuItem>Marques</MenuItem>
            </MenuList>
          </Menu>
        </SimpleGrid>
      </Box>

      <Box>
        <Button colorScheme="teal" width="100%">
          {" "}
          Perform Bill{" "}
        </Button>
      </Box>
    </Flex>
  );
};
