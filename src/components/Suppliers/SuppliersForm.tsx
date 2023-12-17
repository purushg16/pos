import { Flex, Heading, Input, Button, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const SuppliersForm = () => {
  const [newSupplier, editSupplier] = useState({
    name: "",
    number: parseInt(""),
    balance: parseInt(""),
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(false);
  };

  useEffect(() => {
    if (newSupplier.name && newSupplier.number) setSubmit(true);
  }, [newSupplier]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Supplier </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Supplier Name</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newSupplier.name}
                onChange={(event) => {
                  editSupplier({ ...newSupplier, name: event.target.value });
                }}
              />
            </Box>

            <Box>
              <Text>Phone Number</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newSupplier.number}
                onChange={(event) => {
                  editSupplier({
                    ...newSupplier,
                    number: parseInt(event.target.value),
                  });
                }}
              />
            </Box>

            <Box>
              <Text>Pending Balance</Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                type="number"
                value={newSupplier.balance}
                onChange={(event) => {
                  editSupplier({
                    ...newSupplier,
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
              loadingText="Adding Supplier..."
            >
              Add Supplier
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
