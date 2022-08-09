import { VStack, Box, HStack, Heading } from "@chakra-ui/react";
import { SleepGraph } from "./SleepGraph";
import moment from "moment";
import { parseSecs } from "../../lib/utils";
import { fetchSummaryData } from "../../lib/client";

import _ from "lodash";
import { Sleep } from "../../models";
import { InfoBar, InfoText } from "./InfoIcon";
import { useState } from "react";
import useSWR from "swr";
import { RadioButtons } from "./customRadio";

const SleepDayCard: React.FunctionComponent<{ latestSleep: Sleep }> = ({
  latestSleep,
}) => {
  const totalTime = parseSecs(latestSleep?.total);
  const rem = parseSecs(latestSleep?.rem);
  const deep = parseSecs(latestSleep?.deep);
  const latency = parseSecs(latestSleep?.latency);

  return (
    <VStack sx={{ width: "100%" }} alignItems={"flex-end"} p={5}>
      <Heading fontWeight={600} fontSize={12} color={"gray"}>
        {moment(latestSleep?.bedtime_start).format("Do ddd HH:mm A")} -{" "}
        {moment(latestSleep?.bedtime_stop).format("HH:mm A")}
      </Heading>
      <HStack sx={{ width: "100%", py: 15 }}>
        <VStack sx={{ width: "50%" }}>
          <InfoText
            label={"TOTAL SLEEP"}
            value1={totalTime.hours}
            suffix1={"h"}
            value2={totalTime.minutes}
            suffix2={"min"}
          />
          <InfoText
            label={"AVERAGE RESTING HR"}
            value1={latestSleep?.hr_average}
            suffix1={"bpm"}
            value2={null}
            suffix2={null}
          />
          <InfoText
            label={"RESPIRATORY RATE"}
            value1={latestSleep?.respiratory_rate}
            suffix1={"br/min"}
            value2={null}
            suffix2={null}
          />
        </VStack>
        <VStack sx={{ width: "50%" }}>
          <InfoBar
            barValue={latestSleep?.total / (36 * 8)}
            label={"TOTAL"}
            value1={totalTime.hours}
            suffix1={"h"}
            value2={totalTime.minutes}
            suffix2={"min"}
            color={null}
          />
          <InfoBar
            barValue={latestSleep?.rem / (36 * 3)}
            label={"DEEP"}
            value1={deep.hours}
            suffix1={"h"}
            value2={deep.minutes}
            suffix2={"min"}
            color={null}
          />
          <InfoBar
            barValue={latestSleep?.rem / (36 * 3)}
            label={"REM"}
            value1={rem.hours}
            suffix1={"h"}
            value2={rem.minutes}
            suffix2={"min"}
            color={null}
          />
          <InfoBar
            barValue={latestSleep?.efficiency}
            label={"EFFICIENCY"}
            value1={latestSleep?.efficiency}
            suffix1={"%"}
            value2={null}
            suffix2={null}
            color={null}
          />
          <InfoBar
            barValue={latestSleep?.latency / (36 * 3)}
            label={"LATENCY"}
            value1={latency.hours}
            suffix1={"h"}
            value2={latency.minutes}
            suffix2={"min"}
            color={null}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

export const SleepPanel = ({ userId }) => {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").toISOString()
  );
  const [endDate, setEndDate] = useState(moment().toISOString());

  const { data: sleeps = [], error: errorSleep } = useSWR(
    userId ? ["sleep", userId, startDate, endDate, "sleep"] : null,
    fetchSummaryData
  );

  const handleDateChange = (period: "1w" | "1m") => {
    switch (period) {
      case "1m":
        setStartDate(moment().subtract(30, "days").toISOString());
        return;
      case "1w":
        setStartDate(moment().subtract(7, "days").toISOString());
        return;
      default:
        return;
    }
  };
  const sleepsSorted = _.orderBy(sleeps, (x) => moment(x.date).unix(), "desc");
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
      {sleeps && <SleepDayCard latestSleep={sleepsSorted[0]} />}
      <HStack width={"100%"} justifyContent={"flex-end"}>
        <RadioButtons
          options={["1w", "1m"]}
          onChange={handleDateChange}
          defaultValue="1w"
        />
      </HStack>
      <HStack sx={{ width: "100%" }}>
        <Box width={"600px"} height={"400px"}>
          <SleepGraph data={sleeps ? sleeps : []} />
        </Box>
      </HStack>
    </VStack>
  );
};
