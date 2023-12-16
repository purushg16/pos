import {
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import useBillStore from "../../functions/store/BillStore";
import useCategoryStore from "../../functions/store/CategoryStore";
import useProductStore from "../../functions/store/ProductStore";
import convertToBill from "./convertToBill";

const BillingTabItemSelector = () => {
  const filteredCategories = useCategoryStore((s) => s.filteredCategories);
  const filterCategory = useCategoryStore((s) => s.filterCategory);
  const productsList = useProductStore((s) => s.productsList);
  const searchProducts = useProductStore((s) => s.searchProductsByCategory);
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const toast = useToast();

  return (
    <>
      {productsList?.length > 0 ? (
        <SimpleGrid columns={3} spacing={3} alignItems="center">
          {productsList.map((product) => (
            <Card
              width="max-content"
              key={product._id}
              id={`product` + String(product._id)}
              onClick={() => {
                addBillEntries(convertToBill(product));
                toast({
                  title: "Item added to bill",
                  // description: desc,
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                  position: "top",
                });
              }}
              cursor="pointer"
            >
              <CardHeader>
                <Heading
                  size={"sm"}
                  whiteSpace="nowrap"
                  textTransform="capitalize"
                >
                  {product.itemName}
                </Heading>
              </CardHeader>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={3} spacing={3} alignItems="center">
          {filteredCategories.map((category, index) => {
            return (
              <Card
                key={index}
                onClick={() => {
                  filterCategory(category._id);
                  searchProducts(category.name);
                }}
                cursor="pointer"
              >
                <CardHeader>
                  <Heading
                    size={"sm"}
                    whiteSpace="nowrap"
                    textTransform="capitalize"
                  >
                    {category.name}
                  </Heading>
                </CardHeader>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default BillingTabItemSelector;
