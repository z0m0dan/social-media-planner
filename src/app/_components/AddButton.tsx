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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import type { Event } from "../page";
import { useState } from "react";
import { api } from "@/trpc/react";

type props = {
  refetch: () => void;
};

type PartialEvent = {
  title: string;
  description: string;
  priority: number;
  date: Date;
};

const AddEventContainer: React.FC<props> = ({ refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState<PartialEvent>({
    title: "",
    description: "",
    priority: 1,
    date: new Date(),
  });

  const mutation = api.post.createPost.useMutation();

  const parseDateToChakraFormatString = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return dateString;
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (e.target.name === "date") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: new Date(e.target.value),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreatePost = () => {
    console.log(form);
    mutation.mutate(form, {
      onSuccess: (data) => {
        console.log(data);
        refetch();
        onClose();
      },
    });
  };
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
          <ModalHeader>Agregar un Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descripcion</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleFormChange}
                  value={form.description}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Prioridad</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleFormChange}
                  value={form.priority}
                  name="priority"
                >
                  <option value="1">Baja</option>
                  <option value="2">Media</option>
                  <option value="3">Alta</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  name="date"
                  onChange={handleFormChange}
                  value={parseDateToChakraFormatString(form.date || new Date())}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleCreatePost}>
              Crear Evento
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddEventContainer;
