import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  VStack,
  Text,
  Switch,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import useBillStore from "../../functions/store/billStore";
import useBilling from "../../functions/hooks/useBilling";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Partial = ["No Credit", "Partial Credit", "Credit"];

export default function BillPaymentModal({ isOpen, onClose }: Props) {
  const partialPayment = useBillStore((s) => s.partialPayment);
  const paymentMode = useBillStore((s) => s.paymentMode);
  const partialAmount = useBillStore((s) => s.partialAmount);
  const setPartialPayment = useBillStore((s) => s.setPartialPayment);
  const setPartialAmount = useBillStore((s) => s.setPartialAmount);
  const setPaymentMode = useBillStore((s) => s.setPaymentMode);
  const [isLoading, setLoading] = useState(false);

  const { refetch } = useBilling({ type: "POST" })!;
  const toast = useToast();

  const onSubmitBill = () => {
    refetch().then((res) => {
      const { data, isSuccess, isError } = res;

      console.log(data);
      console.log(isSuccess);

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      } else if (isError) {
        toast({
          title: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Payment Method </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <SimpleGrid width="100%" columns={2} alignItems="baseline" my={2}>
                <Text> Payment: </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {partialPayment || "Not Selected"}
                  </MenuButton>

                  <MenuList>
                    {Partial.map((p, index) => (
                      <MenuItem
                        key={index}
                        onClick={() =>
                          setPartialPayment(p.replace(" ", "-").toLowerCase())
                        }
                      >
                        {p}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </SimpleGrid>

              {partialPayment !== "no-credit" && (
                <SimpleGrid
                  width="100%"
                  columns={2}
                  alignItems="baseline"
                  my={2}
                >
                  <Text> Amount Paid: </Text>
                  <InputGroup>
                    <InputLeftAddon children="Rs." />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={partialAmount || parseFloat("")}
                      onChange={(event) => {
                        setPartialAmount(parseFloat(event.target.value));
                      }}
                    />
                  </InputGroup>
                </SimpleGrid>
              )}

              <SimpleGrid width="100%" columns={2} alignItems="baseline" my={2}>
                <Text> Payment Mode: </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {paymentMode || "Not Selected"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setPaymentMode("UPI");
                      }}
                    >
                      UPI
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setPaymentMode("Cash");
                      }}
                    >
                      Cash
                    </MenuItem>
                  </MenuList>
                </Menu>
              </SimpleGrid>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Back
            </Button>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Please wait..."
              isDisabled={
                paymentMode && partialPayment === "no-credit"
                  ? false
                  : paymentMode && partialPayment && partialAmount
                  ? false
                  : true
              }
              onClick={() => {
                onSubmitBill();
              }}
            >
              Perfom Bill
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
