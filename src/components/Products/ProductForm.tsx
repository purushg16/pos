import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Text,
  SimpleGrid,
  useToast,
  ButtonGroup,
  IconButton,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  VStack,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useProducts from "../../functions/hooks/useProducts";
import BillTabContainer from "../Billings/BillTabContainer";
import useCategoryStore from "../../functions/store/categoryStore";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SupplierModal from "../Suppliers/SupplierModal";
import useSupplierStore from "../../functions/store/suppliersStore";
import { Supplier } from "../entities/Supplier";
import { BsSearch } from "react-icons/bs";
import useSuppliers from "../../functions/hooks/useSuppliers";

const UNITS = [
  "None",
  "BAGS",
  "BOTTLES",
  "BOX",
  "BUNDLES",
  "CANS",
  "CARTONS",
  "DOZENS",
  "GRAMMES",
  "KILOGRAMS",
  "LITRE",
  "METERS",
  "MILILITRE",
  "NUMBERS",
  "PACKS",
  "PAIRS",
  "PIECES",
  "QUINTAL",
  "ROLLS",
  "SQUARE FEET",
  "SQUARE METERS",
  "TABLETS",
];

const ProductForm = () => {
  const currentCategory = useCategoryStore((s) => s.currentCategory);
  const [newProduct, editProduct] = useState({
    itemName: "",
    barCode: parseInt(""),
    code: parseInt(""),
    taxRate: parseInt(""),
    mrp: parseInt(""),
    zone: "",
    unit: "None",
    topUnit: "None",
    unitConv: parseInt(""),
    category: currentCategory?._id!,
    salesPrice: parseInt(""),
  });

  useEffect(() => {
    if (!!!newProduct.category)
      editProduct({ ...newProduct, category: currentCategory?._id! });
  }, [currentCategory]);

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
          category: "",
          taxRate: parseInt(""),
          mrp: parseInt(""),
          unit: "",
          topUnit: "None",
          unitConv: parseInt(""),
          salesPrice: parseInt(""),
          zone: "",
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
      newProduct.unit !== "None" &&
      newProduct.category &&
      newProduct.taxRate &&
      newProduct.mrp &&
      newProduct.salesPrice &&
      currentCategory &&
      (newProduct.topUnit === "None" ||
        (newProduct.topUnit !== "None" && newProduct.unitConv))
    )
      setSubmit(true);
    else setSubmit(false);
  }, [newProduct, currentCategory]);

  useSuppliers({ type: "GET" });

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width="90%">
        <Heading> Add Product </Heading>
        <form onSubmit={(event) => onSubmit(event)}>
          <SimpleGrid columns={3} columnGap={10}>
            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> Product Name</Text>
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
                <Text fontSize="xl"> Bar Code </Text>
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
                <Text fontSize="xl"> Code </Text>
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
                <Text fontSize="xl"> Tax Rate </Text>
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
            </Flex>

            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> MRP </Text>
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

              <Box>
                <Text fontSize="xl"> Zone </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  value={newProduct.zone}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      zone: event.target.value,
                    });
                  }}
                />
              </Box>

              <Box>
                <Text fontSize="xl"> Sales Price </Text>
                <Input
                  focusBorderColor="teal"
                  variant="flushed"
                  type="number"
                  value={newProduct.salesPrice}
                  onChange={(event) => {
                    editProduct({
                      ...newProduct,
                      salesPrice: parseInt(event.target.value),
                    });
                  }}
                />
              </Box>
            </Flex>

            <Flex flexDirection="column" gap={5} marginY={7}>
              <Box>
                <Text fontSize="xl"> Category: </Text>
                <ButtonGroup isAttached size="md" width="100%">
                  <Button width="100%">
                    {currentCategory ? currentCategory.name : "-"}{" "}
                  </Button>
                  <BillTabContainer selector inline />
                </ButtonGroup>
              </Box>

              <Box>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <Text fontSize="xl"> Unit </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        size="lg"
                        width="100%"
                      >
                        {newProduct.unit || "None"}
                      </MenuButton>
                      <MenuList maxHeight={250} overflowY="scroll">
                        {UNITS.map((unit: string) => (
                          <MenuItem
                            onClick={() =>
                              editProduct({ ...newProduct, unit: unit })
                            }
                          >
                            {unit}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>

                  <Box>
                    <Text fontSize="xl"> Top Unit </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        size="lg"
                        width="100%"
                      >
                        {newProduct.topUnit || "None"}
                      </MenuButton>
                      <MenuList maxHeight={250} overflowY="scroll">
                        {UNITS.map((unit: string) => (
                          <MenuItem
                            onClick={() =>
                              editProduct({ ...newProduct, topUnit: unit })
                            }
                          >
                            {unit}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>
                </SimpleGrid>
              </Box>
              {newProduct.topUnit !== "None" && (
                <Box>
                  <Text fontSize="xl"> Unit Conversion </Text>
                  <Input
                    focusBorderColor="teal"
                    variant="flushed"
                    type="number"
                    value={newProduct.unitConv}
                    onChange={(event) => {
                      editProduct({
                        ...newProduct,
                        unitConv: parseInt(event.target.value),
                      });
                    }}
                  />
                </Box>
              )}
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
