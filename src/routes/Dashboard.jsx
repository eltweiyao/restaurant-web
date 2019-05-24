/*
 * @Author: cuiweiyao
 * @Date: 2018-10-09 17:28:12
 */
import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import OverviewBusiness from "../components/Dashboard/overviewBusiness";
import History from "../components/Dashboard/history";
import PieChart from "../components/Dashboard/pieChart";
import Header from "../components/Dashboard/header";

const Dashboard = ({ state, dispatch }) => {
  const {
    active,
    turnoverReport,
    // historyData,
    diagramReport,
    dishFanReport,
    storeFanReport,
    frontPageQueryType
  } = state.dashboard;
  const headerProps = {
    active,
    frontPageQueryType,
    onChangeTime(value) {
      dispatch({
        type: "dashboard/updateState",
        payload: {
          dateLevel: value,
          active: value
        }
      });
      dispatch({
        type: "dashboard/getStoreFanReport",
        payload: {
          dateLevel: value
        }
      });
      dispatch({
        type: "dashboard/getTurnoverReport",
        payload: {
          dateLevel: value
        }
      });
      dispatch({
        type: "dashboard/getDiagramReport",
        payload: {
          dateLevel: value
        }
      });
      dispatch({
        type: "dashboard/getDishFanReport",
        payload: {
          dateLevel: value
        }
      });
    }
  };
  const turnoverReportProps = {
    // 营业统计
    title: "营业统计",
    data: turnoverReport,
    line: [
      { name: "营业额", dataKey: "totalPrice", stroke: "#8884d8" },
      { name: "利润", dataKey: "totalBonus", stroke: "#82ca9d" }
    ]
  };

  const diagramReportProps = {
    data: diagramReport,
    line: [
      { name: "营业额", dataKey: "totalPrice", stroke: "#8884d8" },
      { name: "利润", dataKey: "totalBonus", stroke: "#82ca9d" }
    ],
    size: active
  };
  const dishFanReportProps = {
    data: dishFanReport || [],
    title: "菜品售卖情况"
  };
  const storeFanReportProps = {
    data: storeFanReport || [],
    title: "门店销售情况"
  };
  return (
    <div>
      <Header {...headerProps} />
      <OverviewBusiness data={turnoverReport || {}} />
      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={24}>
          <History {...diagramReportProps} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col md={12} sm={24}>
          <PieChart {...dishFanReportProps} />
        </Col>
        <Col md={12} sm={24}>
          <PieChart {...storeFanReportProps} />
        </Col>
      </Row>
    </div>
  );
};

Dashboard.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Dashboard);
