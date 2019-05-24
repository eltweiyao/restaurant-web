/* eslint-disable */
/*
 * @Author: cuiweiyao
 * @Date: 2019-04-09 19:19:36
 */
import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import ChartCard from "./chartCard";

const history = ({ data, line, title, size }) => (
  <ChartCard title={title}>
    <ResponsiveContainer height={300}>
      <LineChart data={data}>
        <XAxis interval={size === 4 ? 1 : "auto"} dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        {line.map((item, index) => (
          <Line
            key={`history-${index}`}
            type="monotone"
            name={item.name}
            dataKey={item.dataKey}
            stroke={item.stroke}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

history.propTypes = {
  data: PropTypes.array,
  line: PropTypes.array,
  title: PropTypes.string
};

export default history;
