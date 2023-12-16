import { Box, SimpleGrid } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

export const MenuContainer = () => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing={10}>
      <Box>
        <MenuCard />
      </Box>
      <Box>
        <MenuCard />
      </Box>
      <Box>
        <MenuCard />
      </Box>
      <Box>
        <MenuCard />
      </Box>
    </SimpleGrid>
  );
};
