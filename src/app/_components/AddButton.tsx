import { AddIcon } from "@chakra-ui/icons";
import {
  Tooltip,
  IconButton,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import type { Event } from "../page";

type props = {
  updateEvents: (events: Event[], day: number) => void;
};

const AddEventContainer: React.FC<props> = ({ updateEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        label="Agregar Evento"
        aria-label="Agregar Evento"
        placement="left"
      >
        <IconButton
          aria-label="Add Event"
          icon={<AddIcon />}
          position={"absolute"}
          right={"2%"}
          bottom={"2%"}
          boxShadow={"md"}
          bgColor={"blue.500"}
          color={"white"}
          _hover={{ bgColor: "blue.600" }}
          isRound
          size={"lg"}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddEventContainer;
