import type { NextPage } from "next";
import { VStack, Heading, HStack, Text, Box } from "@chakra-ui/react";
import { Card } from "../components/Card";
import { CreateUserVital } from "../components/CreateUserVital";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/client";
import { SleepPanel } from "../components/dashboard/SleepPanel";
import { ActivityPanel } from "../components/dashboard/ActivityPanel";

const Home: NextPage = () => {
  const [userID, setUserID] = useState(null);
  const { data: users } = useSWR("/users/", fetcher);

  return (
    <VStack
      my={10}
      px={10}
      backgroundColor={"#fcfdff"}
      height={"100vh"}
      spacing={10}
    >
      <Heading size={"lg"}>Vital Quickstart</Heading>
      <HStack width={"100%"} alignItems={"flex-start"}>
        <Box width={"50%"}>
          <CreateUserVital users={users ? users : []} onCreate={setUserID} />
        </Box>
        <Box width={"50%"}>
          <Heading size={"md"} pb={5}>
            Analyse
          </Heading>
          <SleepPanel userId={users ? users[0].user_id : null} />
          <ActivityPanel userId={users ? users[0].user_id : null} />
        </Box>
      </HStack>
    </VStack>
  );
};

export default Home;
