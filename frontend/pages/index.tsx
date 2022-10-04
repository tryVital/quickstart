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
  const { data } = useSWR("/users/", fetcher);

  const usersFiltered = data?.users ? (data.total > 0 ? data.users : []) : [];

  return (
    <VStack
      my={10}
      px={10}
      backgroundColor={"#fcfdff"}
      height={"100vh"}
      spacing={10}
      alignItems={"flex-start"}
    >
      <Heading size={"lg"} fontWeight={800}>
        Vital Quickstart
      </Heading>
      <VStack width={"100%"} alignItems={"flex-start"}>
        <Box width={"100%"}>
          <CreateUserVital
            users={usersFiltered}
            onCreate={setUserID}
            onSelect={setUserID}
          />
        </Box>
        <Box width={"100%"}>
          <Card>
            <Heading size={"md"}>2. Visualize user data</Heading>
            <Text>
              Request user data and plot activity, workout sleep and other
              health information.
            </Text>
            <HStack width={"100%"} spacing={10} alignItems={"flex-start"}>
              <Box width={"50%"}>
                <SleepPanel userId={userID} />
              </Box>
              <Box width={"50%"}>
                <ActivityPanel userId={userID} />
              </Box>
            </HStack>
          </Card>
        </Box>
      </VStack>
    </VStack>
  );
};

export default Home;
