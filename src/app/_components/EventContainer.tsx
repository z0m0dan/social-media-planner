import { Flex } from "@chakra-ui/react";
import type { Event } from "../page";

type Props = {
  event: Event;
};

const EventContainer: React.FC<Props> = ({ event }) => {
  return (
    <Flex
      w="100%"
      bgColor={"red.100"}
      borderRadius={"md"}
      mt={2}
      px={2}
      border={".3px solid"}
    >
      {event.title}
    </Flex>
  );
};

export default EventContainer;
