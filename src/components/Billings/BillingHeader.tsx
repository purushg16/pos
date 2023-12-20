import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import useCategoryies from "../../functions/hooks/useCategories";
import useProducts from "../../functions/hooks/useProducts";
import useBillStore from "../../functions/store/billStore";
import BillTabContainer from "./BillTabContainer";
import BillingItemIdSelector from "./BillingItemIdSelector";

interface Props {
  stock?: boolean;
}

export const BillingHeader = ({ stock = false }: Props) => {
  const clearEntries = useBillStore((s) => s.clearEntries);
  const BillEntries = useBillStore((s) => s.BillEntries);
  useCategoryies({ type: "GET" });
  useProducts({ type: "GET" });

  return (
    <Flex gap={5} alignItems="center" width="100%">
      <Heading size={"1xl"}> Select Products: </Heading>
      <BillTabContainer stock={stock} />
      <BillingItemIdSelector stock={stock} />
      <Spacer />
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
    </Flex>
  );
};
