import { WarningTwoIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    IconButton,
  } from "@chakra-ui/react";
  import { Check, Close } from "@mui/icons-material";
  
  export default function ModalError({
    isOpen,
    handleConfirmacion,
    onClose,
    pregunta,
    datoAConfirmar,
  }) {
    return (
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {pregunta}
          </ModalHeader>
          <ModalBody textAlign={"center"}>
            {datoAConfirmar}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <IconButton
              onClick={onClose}
              color={"white"}
              bg={"red.600"}
              icon={<WarningTwoIcon />}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }