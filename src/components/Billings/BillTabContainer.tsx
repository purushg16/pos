import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import BillingTabItemSelector from "./BillingItemTabSelector";
import useCategoryStore from "../../functions/store/categoryStore";
import useProductStore from "../../functions/store/ProductStore";

interface Props {
  small?: boolean;
}

const BillTabContainer = ({ small = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearCategoryFilters = useCategoryStore(
    (s) => s.clearCategoriesFilters
  );
  const clearProductFilters = useProductStore((s) => s.clearProductFilters);
  const reverseCategory = useCategoryStore((s) => s.reverseCategory);
  return (
    <Box>
      <Button onClick={onOpen} size={small ? "sm" : "md"}>
        {small ? "Pick" : "using Category"}
      </Button>
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
  );
};

export default BillTabContainer;
