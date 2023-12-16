import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useBillStore from "../../functions/store/BillStore";
import useProductStore from "../../functions/store/ProductStore";
import convertToBill from "./convertToBill";

const BillingItemIdSelector = () => {
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const searchProductById = useProductStore((s) => s.searchProductById);
  const uniqueProduct = useProductStore((s) => s.searchedProductList);
  const toast = useToast();

  const ref = useRef<HTMLInputElement>(null);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        using Product ID
      </MenuButton>
      <MenuList>
        <Box paddingX={2} marginY={2}>
          <InputGroup>
            <InputLeftElement children={<BsSearch />} />
            <Input
              ref={ref}
              placeholder="Search Items..."
              variant={"filled"}
              borderRadius={7}
              onChange={() => {
                if (ref.current) {
                  searchProductById(ref.current.value.split("").map(Number));
                }
              }}
            />
          </InputGroup>
        </Box>

        <VStack marginX={3} gap={3}>
          {uniqueProduct.map((item) => (
            <Button
              width="100%"
              marginX={2}
              key={item._id}
              onClick={() => {
                addBillEntries(convertToBill(item));
                toast({
                  title: "Item added to bill",
                  // description: desc,
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                  position: "top",
                });
              }}
            >
              {item.itemName}
            </Button>
          ))}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default BillingItemIdSelector;
