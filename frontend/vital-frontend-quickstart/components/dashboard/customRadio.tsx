// @ts-nocheck
import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

export const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="0"
        borderRadius="20"
        fontSize={12}
        bg={"transparent"}
        fontWeight={600}
        _checked={{
          bg: props.selectedColor ? props.selectedColor : "rgba(43,79,119,1)",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export const RadioCardSquare = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth={0}
        borderRadius={5}
        boxShadow={"none"}
        fontSize={12}
        bg={"transparent"}
        fontWeight={600}
        _checked={{
          bg: props.selectedColor ? props.selectedColor : "rgba(43,79,119,1)",
          color: "white",
        }}
        _focus={{
          boxShadow: 0,
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

interface RadioButtonProps {
  options: Any;
  onChange: Any;
  selectedColor?: string;
  isSquare?: boolean;
  defaultValue: string;
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const RadioButtons: React.FunctionComponent<RadioButtonProps> = ({
  options,
  onChange,
  selectedColor,
  isSquare,
  defaultValue,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack
      {...group}
      bg="white"
      shadow={isSquare ? "none" : "base"}
      borderRadius={isSquare ? 0 : "20"}
    >
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return isSquare ? (
          <RadioCardSquare key={value} {...radio} selectedColor={selectedColor}>
            {value}
          </RadioCardSquare>
        ) : (
          <RadioCard key={value} {...radio} selectedColor={selectedColor}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
