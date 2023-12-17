import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Text,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useProducts from "../../functions/hooks/useProducts";

const ProductForm = () => {
  const [newProduct, editProduct] = useState({
    itemName: "",
    barCode: parseInt(""),
    code: parseInt(""),
    unit: "",
    category: "",
    taxRate: parseInt(""),
    mrp: parseInt(""),
    suppliers: [],
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const { refetch } = useProducts({ type: "POST", product: newProduct });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    refetch().then((res) => {
      const { data, isError, isSuccess } = res;

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        editProduct({
          itemName: "",
          barCode: parseInt(""),
          code: parseInt(""),
          unit: "",
          category: "",
          taxRate: parseInt(""),
          mrp: parseInt(""),
          suppliers: [],
        });
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
    if (
      newProduct.itemName &&
      newProduct.barCode &&
      newProduct.code &&
      newProduct.unit &&
      newProduct.category &&
      newProduct.taxRate &&
      newProduct.mrp
    )
      setSubmit(true);
  }, [newProduct]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width="60%">
        <Heading> Add Product </Heading>
        <form onSubmit={(event) => onSubmit(event)}>
          <SimpleGrid columns={2} columnGap={5}>
            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text> Product Name</Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  value={newProduct.itemName}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      itemName: event.target.value,
                    });
                  }}
                />
              </Box>

              <Box>
                <Text> Bar Code </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.barCode}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      barCode: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text> Code </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.code}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      code: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text> Unit </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.unit}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      unit: event.target.value,
                    });
                  }}
                />
              </Box>
            </Flex>

            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text> Category </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  value={newProduct.category}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      category: event.target.value,
                    });
                  }}
                />
              </Box>

              <Box>
                <Text> Tax Rate </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.taxRate}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      taxRate: parseFloat(event.target.value),
                    });
                  }}
                />
              </Box>

              <Box>
                <Text> MRP </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.mrp}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      mrp: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>
            </Flex>
          </SimpleGrid>
          <Button
            width="100%"
            colorScheme="teal"
            type="submit"
            my={2}
            isLoading={isLoading}
            isDisabled={!canSubmit}
            loadingText="Adding Product..."
          >
            Add Product
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ProductForm;
