import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCustomers from "../../functions/hooks/useCustomers";

const CustomerForm = () => {
  const toast = useToast();

  const [newCustomer, editCustomer] = useState({
    name: "",
    number: parseInt(""),
    balance: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { refetch } = useCustomers({
    type: "POST",
    customer: newCustomer,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    refetch().then((res) => {
      const { data, isSuccess, isError } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        editCustomer({ name: "", number: 0, balance: 0 });
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
  };

  useEffect(() => {
    if (newCustomer.name && newCustomer.number) setSubmit(true);
    else setSubmit(false);
  }, [newCustomer]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Customer </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Customer Name</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newCustomer.name}
                onChange={(event) => {
                  editCustomer({
                    ...newCustomer,
                    name: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <Text>Phone Number</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newCustomer.number}
                onChange={(event) => {
                  editCustomer({
                    ...newCustomer,
                    number: parseInt(event.target.value),
                  });
                }}
              />
            </Box>

            <Box>
              <Text>
                Pending Balance <small>(optional)</small>
              </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newCustomer.balance}
                onChange={(event) => {
                  editCustomer({
                    ...newCustomer,
                    balance: parseFloat(event.target.value),
                  });
                }}
              />
            </Box>

            <Button
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Customer..."
            >
              Add Customer
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CustomerForm;
