import { VStack, Box, HStack, Heading } from "@chakra-ui/react";
import { ActivityGraph } from "./ActivityGraph";
import moment from "moment";
import { parseMins } from "../../lib/utils";
import { fetchSummaryData } from "../../lib/client";
import _ from "lodash";
import { Activity, Sleep } from "../../models";
import { InfoBar, InfoText } from "./InfoIcon";
import { useState } from "react";
import useSWR from "swr";
import { RadioButtons } from "./customRadio";

const ActivityCard: React.FunctionComponent<{ latestActivity: Activity }> = ({
  latestActivity,
}) => {
  const high = parseMins(latestActivity?.high);
  const medium = parseMins(latestActivity?.medium);
  const low = parseMins(latestActivity?.low);

  return (
    <VStack sx={{ width: "100%" }} alignItems={"flex-end"} p={5}>
      <Heading fontWeight={600} fontSize={12} color={"gray"}>
        {moment(latestActivity?.date).format("Do ddd MMM")}
      </Heading>
      <HStack sx={{ width: "100%", py: 15 }}>
        <VStack sx={{ width: "50%" }}>
          <InfoText
            label={"ACTIVE CALORIES"}
            value1={Math.round(latestActivity?.calories_active)}
            suffix1={"kCal"}
            value2={null}
            suffix2={null}
          />
          <InfoText
            label={"TOTAL CALORIES"}
            value1={Math.round(latestActivity?.calories_total)}
            suffix1={"kCal"}
            value2={null}
            suffix2={null}
          />
        </VStack>
        <VStack sx={{ width: "50%" }}>
          <InfoBar
            barValue={latestActivity?.high / (0.6 * 0.5)}
            label={"HIGH"}
            value1={high.hours}
            suffix1={"h"}
            value2={high.minutes}
            suffix2={"min"}
            color={"rgba(153, 192, 74,1)"}
          />
          <InfoBar
            barValue={latestActivity?.medium / (36 * 0.5)}
            label={"MEDIUM"}
            value1={medium.hours}
            suffix1={"h"}
            value2={medium.minutes}
            suffix2={"min"}
            color={"rgba(153, 192, 74,1)"}
          />
          <InfoBar
            barValue={latestActivity?.low / (36 * 0.5)}
            label={"LOW"}
            value1={low.hours}
            suffix1={"h"}
            value2={low.minutes}
            suffix2={"min"}
            color={"rgba(153, 192, 74,1)"}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

export const ActivityPanel = ({ userId }) => {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").toISOString()
  );
  const [endDate, setEndDate] = useState(moment().toISOString());

  const { data: activity = [], error: errorSleep } = useSWR(
    userId ? ["activity", userId, startDate, endDate] : null,
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
  const activitySorted = _.orderBy(
    activity,
    (x) => moment(x.date).unix(),
    "desc"
  );
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
      {activitySorted && <ActivityCard latestActivity={activitySorted[0]} />}
      <HStack width={"100%"} justifyContent={"flex-end"}>
        <RadioButtons
          options={["1w", "1m"]}
          defaultValue={"1w"}
          onChange={handleDateChange}
          selectedColor={"rgba(153, 192, 74,1)"}
        />
      </HStack>
      <HStack sx={{ width: "100%" }}>
        <Box width={"1000px"} height={"400px"}>
          <ActivityGraph data={activity} />
        </Box>
      </HStack>
    </VStack>
  );
};
