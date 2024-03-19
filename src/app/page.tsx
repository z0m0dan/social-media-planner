"use client";
import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import AddEventContainer from "./_components/AddButton";
import { api } from "@/trpc/react";
import Calendar from "./_components/Calendar";
import TimestampSelector from "./_components/TimestampSelector";

export type Event = {
  id: string;
  title: string;
  description: string;
  priority: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [timestampEvents, setTimestapmEvents] = useState<Map<number, Event[]>>(
    new Map(),
  );

  const queryPosts = api.post.getMontlyPosts.useQuery({ month: "1" });
  const updateEvents = (events: Event[], day: number) =>
    setTimestapmEvents(new Map(timestampEvents.set(day, events)));

  if (queryPosts.isLoading) return <div>Loading...</div>;

  if (queryPosts.error) return <div>Error</div>;

  if (!queryPosts.data) return <div>No data</div>;

  return (
    <Flex flexDir={"column"} gap={4} w="100%" mb={4} h={"100vh"}>
      <Heading>Post del mes</Heading>
      <TimestampSelector setSelectedMonth={setSelectedMonth} />
      <Calendar
        selectedMonth={selectedMonth}
        timestampEvents={queryPosts.data.posts}
      />
      <AddEventContainer updateEvents={updateEvents} />
    </Flex>
  );
}
