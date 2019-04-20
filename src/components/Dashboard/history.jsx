/*
 * @Author: wangtaidong
 * @Date: 2018-10-10 09:38:44
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

const history = ({ data, line, title }) => (
  <ChartCard title={title}>
    <ResponsiveContainer height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
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
