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
import { useEffect } from "react";
import useCategoryies from "../../functions/hooks/useCategories";
import useBillStore from "../../functions/store/BillStore";
import useCategoryStore from "../../functions/store/CategoryStore";
import useProductStore from "../../functions/store/ProductStore";
import BillingItemIdSelector from "./BillingItemIdSelector";
import BillingTabItemSelector from "./BillingItemTabSelector";
import useProducts from "../../functions/hooks/useProducts";

export const BillingHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearEntries = useBillStore((s) => s.clearEntries);
  const BillEntries = useBillStore((s) => s.BillEntries);
  const clearCategoryFilters = useCategoryStore(
    (s) => s.clearCategoriesFilters
  );
  const clearProductFilters = useProductStore((s) => s.clearProductFilters);
  const reverseCategory = useCategoryStore((s) => s.reverseCategory);

  const setCategories = useCategoryStore((s) => s.setCategories);
  const { data: allCategories } = useCategoryies();

  const setProductList = useProductStore((s) => s.setProductList);
  const { data: allProducts } = useProducts();

  useEffect(() => {
    if (allCategories) setCategories(allCategories.data);
  }, [allCategories]);

  useEffect(() => {
    if (allProducts) setProductList(allProducts.data);
  }, [allProducts]);

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
                onClick={() => reverseCategory()}
                mx={2}
                variant="outline"
              >
                To Top
              </Button>

              <Button
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
