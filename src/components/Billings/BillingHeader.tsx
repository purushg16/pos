import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import useCategoryies from "../../functions/hooks/useCategories";
import useProducts from "../../functions/hooks/useProducts";
import useBillStore from "../../functions/store/billStore";
import BillTabContainer from "./BillTabContainer";
import BillingItemIdSelector from "./BillingItemIdSelector";
import useStockStore from "../../functions/store/stockStore";

interface Props {
  stock?: boolean;
}

export const BillingHeader = ({ stock = false }: Props) => {
  const clearEntries = useBillStore((s) => s.clearEntries);
  const BillEntries = useBillStore((s) => s.BillEntries);

  const stockProducts = useStockStore((s) => s.stockProducts);
  const clearStock = useStockStore((s) => s.clearStock);
  useCategoryies({ type: "GET" });
  useProducts({ type: "GET" });

  return (
    <Flex gap={5} alignItems="center" width="100%">
      <Heading size={"1xl"}> Select Products: </Heading>
      <BillTabContainer stock={stock} />
      <BillingItemIdSelector stock={stock} />
      <Spacer />
      {!stock && (
        <Box>
          {BillEntries.length > 0 && (
            <Button
              colorScheme="red"
              alignSelf="end"
              variant="outline"
              onClick={() => {
                clearEntries();
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      )}

      {stock && (
        <Box>
          {stockProducts.length > 0 && (
            <Button
              colorScheme="red"
              alignSelf="end"
              variant="outline"
              onClick={clearStock}
            >
              Clear
            </Button>
          )}
        </Box>
      )}
    </Flex>
  );
};
