import React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HStack, Text } from "@chakra-ui/react";
import { IoBed } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";

interface LineGraphProps {
  data: any;
  expanded?: boolean;
}

export const LineGraph: React.FunctionComponent<LineGraphProps> = ({
  data,
  expanded,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          axisLine={false}
          dataKey="date"
          scale={"time"}
          type="number"
          interval={0}
          padding={{ left: 10, right: 10 }}
          domain={["dataMin", "dataMax"]}
          tickFormatter={(unixTime) => moment.unix(unixTime).format("DD")}
        />
        <YAxis
          axisLine={true}
          tick={true}
          domain={["dataMin", "dataMax"]}
          yAxisId={"left"}
          tickMargin={0}
          width={0}
          padding={{ bottom: expanded ? 150 : 50, top: expanded ? 200 : 30 }}
        />
        <YAxis
          axisLine={true}
          tick={true}
          domain={["dataMin", "dataMax"]}
          yAxisId={"calories_active"}
          tickMargin={0}
          width={0}
          tickCount={0}
          padding={{ bottom: 0, top: expanded ? 350 : 50 }}
        />
        <YAxis
          axisLine={false}
          tick={false}
          yAxisId={"average_hr"}
          domain={["dataMin", "dataMax"]}
          padding={{ bottom: expanded ? 300 : 80, top: 1 }}
          tickMargin={0}
          width={0}
          tickCount={0}
        />
        <Tooltip
          labelFormatter={(x, value) => moment.unix(x).format("ddd Do YYYY")}
          formatter={(value: any, name: any, props: any) => {
            if (name === "sleep_total") {
              const v = Math.round((value / 3600) * 100) / 100;
              var decimal = v - Math.floor(v);
              var mins = Math.round(decimal * 60);
              return [
                <HStack>
                  <IoBed />
                  <Text>
                    {Math.floor(v)}hr {mins}min
                  </Text>
                </HStack>,
              ];
            }
            if (name === "average_hr") {
              return [
                <HStack>
                  <AiFillHeart />
                  <Text>{value}</Text>
                </HStack>,
              ];
            }
            if (name === "calories_active") {
              return [
                <HStack>
                  <FaRunning />
                  <Text>{value}</Text>
                </HStack>,
              ];
            }
            return value;
          }}
          itemStyle={{ padding: 0 }}
          labelStyle={{ fontSize: 12, color: "gray" }}
          contentStyle={{ borderRadius: 10 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sleep_total"
          stroke="#597483"
          fill="rgb(153,192,74)"
          strokeWidth={3}
          dot={false}
        />
        <Line
          yAxisId="average_hr"
          type="monotone"
          dataKey="average_hr"
          stroke="#A41726"
          fill="rgb(153,192,74)"
          strokeWidth={3}
          dot={false}
        />
        <Line
          yAxisId="calories_active"
          type="monotone"
          dataKey="calories_active"
          stroke="rgb(153,192,74)"
          fill="rgb(153,192,74)"
          strokeWidth={3}
          dot={false}
        />
        <Legend
          align="left"
          formatter={(value, entry, index) => {
            if (value === "sleep_total") {
              const v = Math.round((value / 3600) * 100) / 100;
              var decimal = v - Math.floor(v);
              var mins = Math.round(decimal * 60);
              return [
                <HStack key={value}>
                  <IoBed />
                  <Text>Total Sleep</Text>
                </HStack>,
              ];
            }
            if (value === "average_hr") {
              return [
                <HStack key={value}>
                  <AiFillHeart />
                  <Text>Average RHR</Text>
                </HStack>,
              ];
            }
            if (value === "calories_active") {
              return [
                <HStack key={value}>
                  <FaRunning />
                  <Text>Active Calories</Text>
                </HStack>,
              ];
            }
            return value;
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
