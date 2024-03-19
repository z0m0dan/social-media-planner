import { Grid, GridItem, Flex } from "@chakra-ui/react";

import EventContainer from "./EventContainer";
import type { Event } from "../page";

type props = {
  selectedMonth: number;
  timestampEvents: Event[];
};

const Calendar: React.FC<props> = ({ selectedMonth, timestampEvents }) => {
  console.log(timestampEvents);
  const getDaysCount = () => {
    const date = new Date(new Date().getFullYear(), selectedMonth, 0);
    return date.getDate();
  };

  const offsetDays = (): number => {
    const date = new Date(new Date().getFullYear(), selectedMonth, 1);
    const day = date.getDay();
    return day - 1;
  };
  return (
    <Flex flexDir={"column"} height="80%" mx={4}>
      <Grid templateColumns={"repeat(7, 1fr)"} gap={3} w={"100%"} mb={2}>
        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Lunes
        </GridItem>

        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Martes
        </GridItem>
        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Miercoles
        </GridItem>

        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Jueves
        </GridItem>

        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Viernes
        </GridItem>

        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Sabado
        </GridItem>

        <GridItem
          w={"100%"}
          border={".5px solid"}
          borderRadius="5px"
          textAlign={"center"}
        >
          Domingo
        </GridItem>
      </Grid>

      <Grid
        templateRows={"repeat(5,1fr)"}
        templateColumns={"repeat(7, 1fr)"}
        gap={3}
        w={"100%"}
        h={"100%"}
      >
        {[...Array(offsetDays()).keys()].map((day) => (
          <GridItem
            w={"100%"}
            key={day}
            border={".5px solid"}
            borderRadius="5px"
            boxShadow={"md"}
            bgColor={"gray.200"}
          >
            {""}
          </GridItem>
        ))}
        {[...Array(getDaysCount()).keys()].map((day) => (
          <GridItem
            w={"100%"}
            key={day}
            border={".5px solid"}
            borderRadius="5px"
            boxShadow={"md"}
            px={1}
            overflowY={"auto"}
            style={{ scrollbarWidth: "thin" }}
            scrollBehavior={"smooth"}
          >
            <Flex>{day + 1}</Flex>
            {timestampEvents &&
              timestampEvents
                .filter((event) => new Date(event.date).getDate() === day + 1)
                .map((event) => (
                  <EventContainer key={event.title} event={event} />
                ))}
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Calendar;
