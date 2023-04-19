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
import { Sleep } from "../../models";
import { parseSecs } from "../../lib/utils";

export const SleepGraph: React.FunctionComponent<{ data: Sleep[] }> = ({
  data,
}) => {
  const fixedData = data.map((el) => ({ ...el, date: moment(el.date).unix() }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={fixedData}>
        <XAxis
          axisLine={false}
          dataKey="date"
          type="number"
          scale={"time"}
          interval={0}
          padding={{ left: 40, right: 40 }}
          domain={["auto", "auto"]}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(unixTime) =>
            moment.unix(unixTime).format("ddd MMM D")
          }
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 14 }}
          // ticks={_.range(0, 250, 50).filter((el) => el < max + 50)}
          // domain={[0, `${max}`]}
          tickFormatter={(value) => {
            const time = parseSecs(value);
            return `${time.hours}h ${time.minutes ? time.minutes : 0} min`;
          }}
        />
        <CartesianGrid vertical={false} />
        <Tooltip
          labelFormatter={(x, value) => moment.unix(x).format("ddd MMM D")}
          labelStyle={{ fontSize: 12, color: "gray" }}
          contentStyle={{ borderRadius: 10 }}
          formatter={(value:any, name:any, props:any) => {
            const time = parseSecs(value);
            return `${time.hours}h ${time.minutes}min`;
          }}
        />

        <Area
          stackId="1"
          type="monotone"
          dataKey="deep"
          fill="rgba(43,79,119,1)"
          strokeWidth={0}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="rem"
          stackId="1"
          strokeWidth={0}
          fill="rgba(43,79,119,0.7)"
        />
        <Area
          type="monotone"
          dataKey="light"
          stackId="1"
          strokeWidth={0}
          fill="rgba(43,79,119,0.4)"
        />
        <Area
          type="monotone"
          dataKey="awake"
          stackId="1"
          strokeWidth={0}
          fill="rgba(43,79,119,0.2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
