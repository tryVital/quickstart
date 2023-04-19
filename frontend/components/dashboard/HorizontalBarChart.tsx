import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#F6BDC0", "#F1959B", "#F07470", "#EA4C46", "#DC1C13"];

interface HorizontalBarChartProps {
  data: any;
  reversed?: boolean;
}

export const HorizontalBarChart: React.FunctionComponent<
  HorizontalBarChartProps
> = ({ data, reversed }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={200} data={data} layout={"vertical"}>
        {/* <Bar dataKey="value" fill="#8884d8" /> */}
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry: any, index: any) => {
            return <Cell key={index} fill={COLORS[index]} />;
          })}
        </Bar>
        <Tooltip
          contentStyle={{
            backgroundColor: "transparent",
            border: "none",
            color: "black",
          }}
          itemStyle={{ color: "black", fontSize: 12 }}
          active={true}
          offset={30}
          formatter={(value: any, name: any, props: any) => [`${value} min`]}
          labelFormatter={(x) => ""}
        />
        <XAxis
          type="number"
          tick={false}
          axisLine={false}
          reversed={reversed}
        />
        <YAxis
          orientation={reversed ? "right" : "left"}
          type={"category"}
          dataKey="name"
          tick={{ fontSize: 10 }}
          tickLine={false}
          interval={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
