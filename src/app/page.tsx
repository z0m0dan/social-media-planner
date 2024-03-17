"use client";
import { Flex, Grid, GridItem, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Event = {
  day: number;
  priority: number;
  title: string;
};

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [timestampEvents, setTimestapmEvents] = useState<Map<number, Event[]>>(
    new Map(),
  );

  const updateEvents = (events: Event[], day: number) =>
    setTimestapmEvents(new Map(timestampEvents.set(day, events)));

  useEffect(() => {
    updateEvents([{ day: 1, priority: 1, title: "Evento 1" }], 1);
  }, []);

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
    <Flex flexDir={"column"} gap={4} w="100%" mb={4} h={"100vh"}>
      <Heading>Post del mes</Heading>
      <Select onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
        <option value={0}>Enero</option>
        <option value={1}>Febrero</option>
        <option value={2}>Marzo</option>
        <option value={3}>Abril</option>
        <option value={4}>Mayo</option>
        <option value={5}>Junio</option>
        <option value={6}>Julio</option>
        <option value={7}>Agosto</option>
        <option value={8}>Septiembre</option>
        <option value={9}>Octubre</option>
        <option value={10}>Noviembre</option>
        <option value={11}>Diciembre</option>
      </Select>
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

        <Grid templateColumns={"repeat(7, 1fr)"} gap={3} w={"100%"} h={"60%"}>
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
            >
              <Flex>{day + 1}</Flex>
              {timestampEvents.get(day + 1)?.length &&
                `Tienes ${timestampEvents.get(day + 1)?.length} eventos `}
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
