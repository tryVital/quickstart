import { VStack } from "@chakra-ui/react";

export const Card = ({ children }: { children: any }) => {
  return (
    <VStack
      border={"1px solid #e3ebf6"}
      px={10}
      py={10}
      alignItems={"flex-start"}
      borderRadius={10}
    >
      {children}
    </VStack>
  );
};
