import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { Card } from "./Card";
import {
  Text,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { Client } from "../lib/client";
import { LinkButton } from "./LinkButton";

const CreateUser = ({ onCreate }) => {
  const [clientUserId, setClientUserId] = useState(null);
  const handleClick = async () => {
    // fetch data
    const client = new Client();
    if (clientUserId) {
      try {
        const data = await client.createUser(clientUserId);
        onCreate(data.user_id);
        setClientUserId(null);
      } catch (e) {
        console.log("Failed to create");
      }
    }
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        placeholder="Enter your unique user_id"
        value={clientUserId}
        onChange={(e) => setClientUserId(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="xs" onClick={handleClick}>
          Create
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export const CreateUserVital = ({ users, onCreate }) => (
  <Card>
    <Heading size={"md"}>1. Create a Vital user</Heading>
    <Text>
      First step is to create a vital user using a unique id you have stored
      against your user.
    </Text>
    <CreateUser onCreate={onCreate} />

    <Heading py={5} size={"sm"}>
      Existing Users
    </Heading>
    <VStack width={"100%"} spacing={5}>
      {users
        .sort((a, b) => a.created_on - b.created_on)
        .reverse()
        .map((el) => {
          return (
            <VStack width={"100%"} alignItems={"flex-start"}>
              <HStack
                alignItems={"center"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <VStack spacing={0} alignItems={"flex-start"}>
                  <Text fontSize={14}>vital_user_id: {el.user_id}</Text>
                  <Text fontSize={14} color="gray.400">
                    {el.client_user_id}
                  </Text>
                  <HStack justifyContent={"flex-end"}>
                    {el.connected_sources.map((el) => (
                      <Image
                        width={"20px"}
                        height={"20px"}
                        borderRadius={"100px"}
                        src={el.source.logo}
                      />
                    ))}
                  </HStack>
                </VStack>
                <LinkButton userID={el.user_id} />
              </HStack>
            </VStack>
          );
        })}
    </VStack>
  </Card>
);
