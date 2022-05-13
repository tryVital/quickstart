import type { NextPage } from "next";
import { VStack, Heading, Button } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useVitalLink } from "@tryvital/vital-link";

// URL for the mock backend which creates the vital link token
const API_URL = "http://localhost:8000";

const getTokenFromBackend = async (userID: string) => {
  const resp = await fetch(`${API_URL}/token/${userID}`);
  const data = await resp.json();
  console.log("DATA", data);
  return data;
};

export const LinkButton: React.FC<{ userID: string | null }> = ({ userID }) => {
  const [isLoading, setLoading] = useState(false);

  const onSuccess = useCallback((metadata) => {
    // Device is now connected.
    console.log("onSuccess", metadata);
  }, []);

  const onExit = useCallback((metadata) => {
    // User has quit the link flow.
    console.log("onExit", metadata);
  }, []);

  const onError = useCallback((metadata) => {
    // Error encountered in connecting device.
    console.log("onError", metadata);
  }, []);

  const config = {
    onSuccess,
    onExit,
    onError,
    env: "sandbox",
    region: "us",
  };

  const { open, ready, error } = useVitalLink(config);

  const handleVitalOpen = async () => {
    setLoading(true);
    const token = await getTokenFromBackend(userID);
    open(token.link_token);
    setLoading(false);
  };

  return (
    <Button
      bg="blue.400"
      color="white"
      fontSize={"12px"}
      px={2}
      py={0}
      onClick={handleVitalOpen}
      isLoading={isLoading || !ready}
      isDisabled={userID ? false : true}
    >
      Connect
    </Button>
  );
};
