import { memo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export const _Modal = memo((props) => {
  const { isOpen, setIsOpen, option } = props;
  const CloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {console.log(isOpen)}
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>会話履歴を削除しますか？</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={CloseModal}>
              NO
            </Button>
            <Button
              variant="ghost"
              _hover={{
                cursor: "pointer",
                opacity: 0.8,
                color: "white",
                bgColor: "red",
              }}
              onClick={option}
            >
              YES
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
