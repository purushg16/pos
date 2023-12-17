import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CustomerForm from "./CustomerForm";
import { useRef } from "react";

export default function CustomerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button width="100%" marginX={2} colorScheme="yellow" onClick={onOpen}>
        Add Customer
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
