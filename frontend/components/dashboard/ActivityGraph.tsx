import React from "react";
import moment from "moment";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";
import { Activity } from "../../models";
import { parseMins, parseSecs } from "../../lib/utils";

export const ActivityGraph: React.FunctionComponent<{ data: Activity[] }> = ({
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
            const time = parseMins(value);
            return `${time.hours ? time.hours : 0}h ${
              time.minutes ? time.minutes : 0
            } min`;
          }}
        />
        <CartesianGrid vertical={false} />
        <Tooltip
          labelFormatter={(x, value) => moment.unix(x).format("ddd MMM D")}
          labelStyle={{ fontSize: 12, color: "gray" }}
          itemStyle={{ color: "rgba(153, 192, 74,1)" }}
          contentStyle={{ borderRadius: 10 }}
          formatter={(value:any, name:any, props:any) => {
            const time = parseMins(value);
            return `${time.hours ? time.hours : 0}h ${
              time.minutes ? time.minutes : 0
            } min`;
          }}
        />

        <Area
          stackId="1"
          type="monotone"
          dataKey="low"
          fill="rgba(153, 192, 74,1)"
          strokeWidth={0}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="medium"
          stackId="1"
          strokeWidth={0}
          fill="rgba(153, 192, 74,0.7)"
        />
        <Area
          type="monotone"
          dataKey="high"
          stackId="1"
          strokeWidth={0}
          fill="rgba(153, 192, 74,0.3)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
