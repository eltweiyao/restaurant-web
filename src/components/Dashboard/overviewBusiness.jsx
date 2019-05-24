/* eslint-disable */
/*
 * @Author: cuiweiyao
 * @Date: 2019-04-09 19:19:36
 */
import React from "react";
import PropTypes from "prop-types";
import { Card, Popover, Icon } from "antd";
import styles from "./index.less";

const overviewOrder = ({ data }) => (
  <div style={{ marginTop: 32 }}>
    <div className={styles.titleWrap}>
      <span className={styles.chartTitle}>营业统计</span>
    </div>
    <Card className="overview-card">
      <div style={{ width: "33.5%", float: "left" }}>
        <Card bordered={false}>
          <div>
            <span className={styles.title}>营业额（元）</span>
            <Popover placement="right" content="售价总额">
              <Icon
                type="question-circle"
                style={{ fontSize: "20px", color: "#08c" }}
              />
            </Popover>
          </div>
          <div className={styles.numBox}>
            <span
              className={styles.number}
              style={{ verticalAlign: "bottom", maxWidth: "100%" }}
            >
              {data.totalPrice ? Number(data.totalPrice).toFixed(2) : "--"}
            </span>
          </div>
        </Card>
      </div>
      <div style={{ width: "35.5%", float: "left" }}>
        <Card bordered={false}>
          <div>
            <span className={styles.title}>利润（元）</span>
            <Popover placement="right" content="商户利润 = 营业额 - 成本价">
              <Icon
                type="question-circle"
                style={{ fontSize: "20px", color: "#08c" }}
              />
            </Popover>
          </div>
          <div className={styles.numBox}>
            <span
              className={styles.number}
              style={{ verticalAlign: "bottom", maxWidth: "100%" }}
            >
              {data.totalBonus ? Number(data.totalBonus).toFixed(2) : "--"}
            </span>
          </div>
        </Card>
      </div>
    </Card>
  </div>
);

overviewOrder.propTypes = {
  data: PropTypes.array
};

export default overviewOrder;
