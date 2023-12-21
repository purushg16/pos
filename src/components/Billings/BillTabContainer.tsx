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
  IconButton,
} from "@chakra-ui/react";
import BillingTabItemSelector from "./BillingItemTabSelector";
import useCategoryStore from "../../functions/store/categoryStore";
import useProductStore from "../../functions/store/ProductStore";
import useCategoryies from "../../functions/hooks/useCategories";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  small?: boolean;
  selector?: boolean;
  stock?: boolean;
  inline?: boolean;
}

const BillTabContainer = ({
  small = false,
  selector = false,
  stock = false,
  inline = false,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearCategoryFilters = useCategoryStore(
    (s) => s.clearCategoriesFilters
  );
  const clearProductFilters = useProductStore((s) => s.clearProductFilters);
  const reverseCategory = useCategoryStore((s) => s.reverseCategory);
  useCategoryies({ type: "GET" });

  return (
    <Box>
      {inline ? (
        <IconButton
          colorScheme="teal"
          aria-label="Search database"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      ) : (
        <Button onClick={onOpen} size={small ? "sm" : "md"}>
          {small
            ? "Pick"
            : selector
            ? inline
              ? "edit"
              : "Select Category"
            : "using Category"}
        </Button>
      )}

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
            <BillingTabItemSelector stock={stock} />
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

            {selector && (
              <Button onClick={onClose} mx={2} colorScheme="green">
                Select
              </Button>
            )}
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
