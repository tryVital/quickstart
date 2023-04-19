import { VStack, Box, HStack, Text, Progress } from "@chakra-ui/react";

export const InfoIcon = ({ icon, label, value }:any) => {
  return (
    <VStack spacing={0} pl={5} pr={"10px"} py={"10px"}>
      {icon}
      <Text fontSize={10}>{label}</Text>
      <Text fontSize={20} lineHeight={0.95} fontWeight={600}>
        {value}
      </Text>
    </VStack>
  );
};

export const InfoText = ({ label, value1, value2, suffix1, suffix2 } :any) => {
  return (
    <VStack spacing={0} pl={5} pr={"10px"} py={"10px"}>
      <HStack spacing={0}>
        <Text fontSize={30}>{value1}</Text>
        <Text fontSize={15} pt={"6px"} pr={"6px"}>
          {suffix1}
        </Text>
        <Text fontSize={30}>{value2}</Text>
        <Text fontSize={15} pt={"6px"}>
          {suffix2}
        </Text>
      </HStack>

      <Text fontSize={14} fontWeight={200} lineHeight={0.95} color={"gray"}>
        {label}
      </Text>
    </VStack>
  );
};

export const InfoBar = ({
  label,
  barValue,
  value1,
  value2,
  suffix1,
  suffix2,
  color,
}:any) => {
  return (
    <HStack sx={{ width: "100%" }}>
      <Box width={"20%"}>
        <Text
          sx={{
            color: "gray",
            fontWeight: 200,
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {label}
        </Text>
      </Box>
      <Box width={"60%"}>
        <Progress
          value={barValue}
          color={"black"}
          colorScheme={color ? "green" : 'inherit'}
          size="md"
          width={"100%"}
        />
      </Box>
      <HStack spacing={0} width={"20%"}>
        <Text fontSize={16}>{value1}</Text>
        <Text fontSize={12} pt={"2px"} pr={"6px"}>
          {suffix1}
        </Text>
        <Text fontSize={16}>{value2}</Text>
        <Text fontSize={12} pt={"2px"}>
          {suffix2}
        </Text>
      </HStack>
    </HStack>
  );
};
