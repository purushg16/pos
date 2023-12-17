import {
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import useBillStore from "../../functions/store/billStore";
import useCategoryStore from "../../functions/store/categoryStore";
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
        <>
          <Heading size="md" mb={5}>
            {" "}
            Products{" "}
          </Heading>
          <SimpleGrid columns={3} spacing={3} alignItems="center">
            {productsList ? (
              productsList.map((product) => (
                <Card
                  variant="outline"
                  background="#a592d3fa"
                  textAlign="center"
                  size="lg"
                  colorScheme="blue"
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
              ))
            ) : (
              <Spinner />
            )}
          </SimpleGrid>
        </>
      ) : (
        <>
          <Heading size={"md"} mb={5}>
            Category
          </Heading>
          <SimpleGrid columns={3} spacing={3} alignItems="center">
            {filteredCategories ? (
              filteredCategories.map((category, index) => {
                return (
                  <Card
                    size="lg"
                    variant="outline"
                    textAlign="center"
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
              })
            ) : (
              <Spinner />
            )}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default BillingTabItemSelector;
