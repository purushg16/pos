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
  Spinner,
  Switch,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useCustomers from "../../functions/hooks/useCustomers";
import useEmployee from "../../functions/hooks/useEmployee";
import { Customer } from "../entities/Customer";
import useBillStore from "../../functions/store/billStore";
import { BillingEntry } from "../entities/BillingEntry";
import useCustomerStore from "../../functions/store/customerStore";
import CustomerModal from "../Customers/CustomerModal";
import EmployeSelector from "./EmployeSelector";
import HandlerSelector from "./HandlerSelector";
import useEmployeStore from "../../functions/store/employeStore";
import GSTSelector from "./GSTSelector";
import useGST from "../../functions/hooks/useGST";
import BillPaymentModal from "./BillPaymentModal";
import useGSTStore from "../../functions/store/gstStore";

export const BillingDetails = () => {
  const ref = useRef<HTMLInputElement>(null);
  const selectCustomers = useCustomerStore((s) => s.selectCustomers);
  const selectedCustomers = useCustomerStore((s) => s.selectedCustomers);
  const BillEntries = useBillStore((s) => s.BillEntries);
  const billType = useBillStore((s) => s.billType);
  const setBillType = useBillStore((s) => s.setBillType);
  const itemHandled = useBillStore((s) => s.itemHandled);
  const setItemHandled = useBillStore((s) => s.setItemHandled);

  const currentCustomer = useCustomerStore((s) => s.currentCustmer);
  const setCurrentCustomer = useCustomerStore((s) => s.setCurrentCustomer);

  useCustomers({ type: "GET" });
  useEmployee({ type: "GET" });
  useGST({ type: "GET" });

  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection={"column"} gap={2} height="95vh">
      <Box padding={2} border="1px solid #80808030" borderRadius={7}>
        <Heading size="1xl" mb={2}>
          Customer Details
        </Heading>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            width="100%"
            textAlign="left"
          >
            {currentCustomer?.name || "Select Customer"}
          </MenuButton>

          <MenuList>
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

            {!selectedCustomers ? (
              <Spinner />
            ) : (
              <Box maxHeight={500} overflowY="scroll">
                <VStack marginX={3} gap={3}>
                  <CustomerModal />

                  {selectedCustomers?.map(
                    (customer: Customer, index: number) => (
                      <Button
                        width="100%"
                        marginX={2}
                        key={index}
                        onClick={() => {
                          setCurrentCustomer(customer);
                        }}
                      >
                        {customer.name}
                      </Button>
                    )
                  )}
                </VStack>
              </Box>
            )}
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
                  return acc + entry.priceWithoutTax;
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
        {/* GST */}
        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>GST:</Text>
          <GSTSelector />
        </SimpleGrid>

        {/* Biller */}
        <SimpleGrid columns={1} my={2}>
          <SimpleGrid columns={2} alignItems="baseline">
            <Text>Biller Name:</Text>
            <EmployeSelector />
          </SimpleGrid>

          {/* Handler */}
          <SimpleGrid columns={2} alignItems="baseline" my={2}>
            <Text>Handler Name:</Text>
            <HandlerSelector />
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
                {billType || "Not Selected"}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setBillType("wholesale")}>
                  Wholesale
                </MenuItem>
                <MenuItem onClick={() => setBillType("retail")}>
                  Retail
                </MenuItem>
              </MenuList>
            </Menu>
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid columns={2} alignItems="baseline" my={2}>
          <Text>Items Handled:</Text>
          <Switch
            id="item-handled"
            colorScheme="teal"
            isChecked={itemHandled}
            onChange={() => setItemHandled(!itemHandled)}
          />
        </SimpleGrid>
      </Box>

      <Box>
        <Button
          colorScheme="blue"
          width="100%"
          isDisabled={
            !(currentBiller && currentHandler && currentGstin && billType)
          }
          onClick={onOpen}
        >
          Perform Bill
        </Button>
        <BillPaymentModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};
