import { VStack, Box, HStack, Avatar, Text, Heading } from "@chakra-ui/react";
import { DetailedLineGraph } from "./DetailedLineGraph";
import moment from "moment";
import { RiHeartPulseFill } from "react-icons/ri";
import { AiFillHeart, AiFillFire } from "react-icons/ai";
import { IoIosTimer } from "react-icons/io";
import { getDiffInMins, parseHrZoneData } from "../../lib/utils";
import _ from "lodash";
import { HorizontalBarChart } from "./HorizontalBarChart";
import { InfoIcon } from "./InfoIcon";
import { Workout } from "../../models";

const WorkoutCard: React.FunctionComponent<{ workout: Workout }> = ({
  workout,
}) => {
  const hrZoneData = parseHrZoneData([workout]);

  return (
    <VStack
      p="6"
      h="xl"
      bg="white"
      shadow="base"
      rounded="lg"
      height="100%"
      my={10}
      alignItems={"flex-start"}
    >
      <HStack justifyContent={"flex-start"} pl={5}>
        <Avatar src={workout.sport.icon} size={"xs"} />
        <VStack spacing={0} alignItems={"flex-start"}>
          <Heading fontSize={14}>{workout.sport.name}</Heading>
          <Text sx={{ fontSize: 10, color: "gray" }}>
            {moment(workout.time_start).format("ddd Do HH:MM A")} -{" "}
            {moment(workout.time_end).format("ddd Do HH:MM A")}
          </Text>
        </VStack>
      </HStack>
      <HStack py={5}>
        <Box width={"200px"} height={"100px"}>
          <AiFillHeart style={{ marginLeft: 20 }} color={"#BA262B"} />
          <HorizontalBarChart data={hrZoneData} reversed={true} />
        </Box>
        <InfoIcon
          label={"Max HR"}
          icon={
            <RiHeartPulseFill size={"25px"} fill={"rgba(144,144,144, 0.5)"} />
          }
          value={workout.max_hr}
        />
        <InfoIcon
          label={"Average HR"}
          icon={<AiFillHeart size={"25px"} fill={"rgba(144,144,144, 0.5)"} />}
          value={workout.average_hr}
        />
        <InfoIcon
          label={"Duration (mins)"}
          icon={<IoIosTimer size={"25px"} fill={"rgba(144,144,144, 0.5)"} />}
          value={`${getDiffInMins(workout.time_start, workout.time_end)}`}
        />
        <InfoIcon
          label={"Calories"}
          icon={<AiFillFire size={"25px"} fill={"rgba(144,144,144, 0.5)"} />}
          value={workout.calories}
        />
      </HStack>
      <HStack sx={{ width: "100%" }}>
        <Box width={"1000px"} height={"400px"}>
          <DetailedLineGraph
            data={workout.heart_rate.map((el) => ({
              ...el,
              timestamp: moment(el.timestamp).unix(),
            }))}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export const WorkoutPanel = ({ workouts }:any) => {
  ({ workouts });
  const workoutsSorted = _.orderBy(
    workouts,
    (x) => moment(x.time_start).unix(),
    "desc"
  );
  return (
    <>
      {workoutsSorted.map((el) => (
        <WorkoutCard workout={el} />
      ))}

      {workoutsSorted.length === 0 && (
        <VStack
          p="6"
          h="xl"
          bg="white"
          shadow="base"
          rounded="lg"
          height="100%"
          my={10}
          alignItems={"center"}
        >
          <Box sx={{ height: "120px", mt: 30 }}>
            <Text sx={{ color: "gray", fontStyle: "italic" }}>
              This user doesn't have any workouts.
            </Text>
          </Box>
        </VStack>
      )}
    </>
  );
};
