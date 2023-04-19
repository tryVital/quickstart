import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { HStack, Text } from "@chakra-ui/react";
import { IoBed } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import _ from "lodash";

interface DataPoint {
  value: number;
}

interface LineProps {
  data: DataPoint[];
}

export const DetailedLineGraph: React.FunctionComponent<LineProps> = ({
  data,
}) => {
  const maxValue = _.maxBy(data, (x) => x.value);
  const max = Math.ceil(maxValue?.value || 0 / 25) * 25;

  const shouldRotate = data.length > 2000;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ bottom: shouldRotate ? 30 : 5 }}>
        <XAxis
          axisLine={false}
          dataKey="timestamp"
          type="number"
          scale={"time"}
          interval={120}
          padding={{ left: 30, right: 30 }}
          domain={["auto", "auto"]}
          tickLine={false}
          tick={{ fontSize: 12 }}
          angle={shouldRotate ? 45 : 0}
          dx={shouldRotate ? 15 : 0}
          dy={shouldRotate ? 20 : 0}
          // minTickGap={-200}
          tickFormatter={(unixTime) => moment.unix(unixTime).format("HH:mm A")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 14 }}
          ticks={_.range(0, 250, 50).filter((el) => el < max + 50)}
          domain={[0, `${max}`]}
        />
        <CartesianGrid vertical={false} />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#A41726"
          fill="rgba(164, 23, 38, 0.3)"
          strokeWidth={1}
          dot={false}
        />
        <Tooltip
          labelFormatter={(x, value) => moment.unix(x).format("HH:mm A")}
          labelStyle={{ fontSize: 12, color: "gray" }}
          contentStyle={{ borderRadius: 10 }}
          formatter={(value: any, name: any, props: any) => {
            if (name === "value") {
              return [
                <HStack>
                  <AiFillHeart />
                  <Text>{value}</Text>
                </HStack>,
              ];
            }
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
