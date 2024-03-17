"use client";
import { Flex, Grid, GridItem, Heading, Select } from "@chakra-ui/react";
import { get } from "http";
import { useState } from "react";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  const getDaysCount = () => {
    const date = new Date(new Date().getFullYear(), selectedMonth, 0);
    return date.getDate();
  };
  return (
    <Flex flexDir={"column"} gap={4} w="100%" mb={4}>
      <Heading>Post del mes</Heading>
      <Select
        placeholder="Selecciona mes"
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
      >
        <option value={1}>Enero</option>
        <option value={2}>Febrero</option>
        <option value={3}>Marzo</option>
        <option value={4}>Abril</option>
        <option value={5}>Mayo</option>
        <option value={6}>Junio</option>
        <option value={7}>Julio</option>
        <option value={8}>Agosto</option>
        <option value={9}>Septiembre</option>
        <option value={10}>Octubre</option>
        <option value={11}>Noviembre</option>
        <option value={12}>Diciembre</option>
      </Select>
      <Grid
        templateColumns={"repeat(7, 1fr)"}
        gap={3}
        w={"100%"}
        p={6}
        h={"40%"}
      >
        {[...Array(getDaysCount()).keys()].map((day) => (
          <GridItem
            w={"100%"}
            key={day}
            border={".5px solid"}
            borderRadius="5px"
            boxShadow={"md"}
          >
            {day + 1}
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
