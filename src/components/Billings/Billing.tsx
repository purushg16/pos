import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { BillingDetails } from "./BillingDetails";
import { BillingHeader } from "./BillingHeader";
import { BillingTable } from "./BillingTable";
import useCategoryies from "../../functions/hooks/useCategories";

export const Billing = () => {
  return (
    <Grid
      templateAreas={`"table details"`}
      gridTemplateColumns={"1fr 450px"}
      padding={5}
    >
      <GridItem area={"table"}>
        <Flex
          justifyContent="center"
          alignItems="start"
          flexDirection="column"
          gap={2}
          paddingRight={2}
        >
          <Box
            width="100%"
            padding={2}
            border="1px solid #80808030"
            borderRadius={7}
          >
            <BillingHeader />
          </Box>

          <Box flex={1}>
            <BillingTable />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={"details"}>
        <BillingDetails />
      </GridItem>
    </Grid>
  );
};
