/* eslint-disable */
/*
 * @Author: cuiweiyao
 * @Date: 2019-04-09 19:19:36
 */
import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "antd";
import styles from "./index.less";

// const Option = Select.Option;

const history = ({
  active,
  // onChangeChannel,
  onChangeTime
}) => (
  <Row>
    <Col span={16} xxl={12}>
      <Button
        className={styles.herderBtn}
        type={active === "today" ? "primary" : "default"}
        onClick={() => onChangeTime(1)}
      >
        今天
      </Button>
      <Button
        className={styles.herderBtn}
        type={active === "yesterday" ? "primary" : "default"}
        onClick={() => onChangeTime(2)}
      >
        昨天
      </Button>
      <Button
        className={styles.herderBtn}
        type={active === "pastThreeDay" ? "primary" : "default"}
        onClick={() => onChangeTime(3)}
      >
        近7天
      </Button>
      <Button
        className={styles.herderBtn}
        type={active === "pastOneMonth" ? "primary" : "default"}
        onClick={() => onChangeTime(4)}
      >
        近1月
      </Button>
      {/*
        <Button className={styles.herderBtn} type={active === 'pastThisMonth' ? 'primary' : 'default'} onClick={() => onChangeTime('pastThisMonth')} >本月</Button>
        <Button type={active === 'pastLastMonth' ? 'primary' : 'default'} onClick={() => onChangeTime('pastLastMonth')} >上月</Button>
      */}
    </Col>
  </Row>
);

history.propTypes = {
  active: PropTypes.string,
  // onChangeChannel: PropTypes.func,
  onChangeTime: PropTypes.func
};

export default history;
