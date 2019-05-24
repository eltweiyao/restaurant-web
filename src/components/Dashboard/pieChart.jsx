/* eslint-disable */
/*
 * @Author: cuiweiyao
 * @Date: 2019-04-09 19:19:36
 */
import React from "react";
import PropTypes from "prop-types";
import {
  Pie,
  PieChart,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import ChartCard from "./chartCard";
import styles from "./index.less";

const abnormalOrder = ({ data, title }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#99ff33",
    "#e6e6e6"
  ];
  const totalStyle = {
    fontWeight: 400,
    position: "absolute",
    left: "55%",
    top: 50,
    color: "#333",
    fontSize: 18,
    width: 190,
    textAlign: "right"
  };
  for (let i = 0; i < data.length; i += 1) {
    data[i].number = Number(data[i].number); //eslint-disable-line
  }
  const total = data.length
    ? data.reduce((sum, item) => Number(sum) + Number(item.number), 0)
    : 0;
  const legendContent = param => {
    const { payload } = param;
    if (!total) {
      payload.pop();
    }
    return (
      <ul className={styles.legendList}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <span
              className={styles.icon}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.value}
            <span className={styles.rate}>{entry.payload.rate}%</span>
          </li>
        ))}
      </ul>
    );
  };
  const emptyData = [
    ...data,
    { type: null, name: "", number: 100, rate: "100.00" }
  ];
  return (
    <div>
      <ChartCard title={title}>
        {data && data.length ? (
          <div>
            <ResponsiveContainer height={300}>
              <PieChart>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ top: 80, left: "55%" }}
                  content={legendContent}
                />
                {total && (
                  <Tooltip formatter={value => <span>{` ${value}`}</span>} />
                )}
                <Pie
                  data={total ? data : emptyData}
                  valueKey="number"
                  nameKey="name"
                  cx="28%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={100}
                  fill="#e6e6e6"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={totalStyle}>{total}</div>
          </div>
        ) : (
          <div className={styles.empty}>暂无数据</div>
        )}
      </ChartCard>
    </div>
  );
};

abnormalOrder.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
  // total: PropTypes.number,
};

export default abnormalOrder;
