import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import useCategoryies from "../../functions/hooks/useCategories";
import useBillStore from "../../functions/store/billStore";
import BillingItemIdSelector from "./BillingItemIdSelector";
import BillingTabItemSelector from "./BillingItemTabSelector";
import useProducts from "../../functions/hooks/useProducts";
import useCategoryStore from "../../functions/store/categoryStore";
import useProductStore from "../../functions/store/ProductStore";

export const BillingHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearEntries = useBillStore((s) => s.clearEntries);
  const BillEntries = useBillStore((s) => s.BillEntries);
  const clearCategoryFilters = useCategoryStore(
    (s) => s.clearCategoriesFilters
  );
  const clearProductFilters = useProductStore((s) => s.clearProductFilters);
  const reverseCategory = useCategoryStore((s) => s.reverseCategory);

  useCategoryies({ type: "GET" });
  useProducts({ type: "GET" });

  return (
    <Flex gap={5} alignItems="center" width="100%">
      <Heading size={"1xl"}> Select Products: </Heading>
      <Box>
        <Button onClick={onOpen}> using Category </Button>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            clearCategoryFilters();
            clearProductFilters();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Select Item </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <BillingTabItemSelector />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  reverseCategory();
                  clearProductFilters();
                }}
                mx={2}
                variant="outline"
                colorScheme="yellow"
              >
                To Top
              </Button>

              <Button
                colorScheme="red"
                onClick={() => {
                  clearCategoryFilters();
                  clearProductFilters();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box>
        <BillingItemIdSelector />{" "}
      </Box>
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
