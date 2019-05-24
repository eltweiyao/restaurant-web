/*
 * @Author: cuiweiyao
 * @Date: 2018-10-09 18:45:29
 */

import modelExtend from "dva-model-extend";
import moment from "moment";
import {
  getTurnoverReport,
  getDiagramReport,
  getDishFanReport,
  getStoreFanReport
} from "../services/dashboard";
import { model } from "./common";

export default modelExtend(model, {
  namespace: "dashboard",
  state: {
    frontPageQueryType: "TODAY",
    active: "today",
    // 概览数据
    overviewData: [],
    // 历史记录数据
    frontPageAnalyses: [
      {
        time: `${moment()
          .startOf("day")
          .format("HH")}:00`,
        completePrice: 0,
        income: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(6, "hours")
          .format("HH")}:00`,
        completePrice: 0,
        income: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(12, "hours")
          .format("HH")}:00`,
        completePrice: 0,
        income: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(18, "hours")
          .format("HH")}:00`,
        completePrice: 0,
        income: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(24, "hours")
          .format("HH")}:00`,
        completePrice: 0,
        income: 0
      }
    ],
    frontPageActs: [
      {
        time: `${moment()
          .startOf("day")
          .format("HH")}:00`,
        thirdPart: 0,
        totalActivity: 0,
        shopPart: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(6, "hours")
          .format("HH")}:00`,
        thirdPart: 0,
        totalActivity: 0,
        shopPart: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(12, "hours")
          .format("HH")}:00`,
        thirdPart: 0,
        totalActivity: 0,
        shopPart: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(18, "hours")
          .format("HH")}:00`,
        thirdPart: 0,
        totalActivity: 0,
        shopPart: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(24, "hours")
          .format("HH")}:00`,
        thirdPart: 0,
        totalActivity: 0,
        shopPart: 0
      }
    ],
    historyOrders: [
      {
        time: `${moment()
          .startOf("day")
          .format("HH")}:00`,
        abnormalOrder: 0,
        allOrder: 0,
        effectiveOrder: 0,
        invalidOrder: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(6, "hours")
          .format("HH")}:00`,
        abnormalOrder: 0,
        allOrder: 0,
        effectiveOrder: 0,
        invalidOrder: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(12, "hours")
          .format("HH")}:00`,
        abnormalOrder: 0,
        allOrder: 0,
        effectiveOrder: 0,
        invalidOrder: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(18, "hours")
          .format("HH")}:00`,
        abnormalOrder: 0,
        allOrder: 0,
        effectiveOrder: 0,
        invalidOrder: 0
      },
      {
        time: `${moment()
          .startOf("day")
          .add(24, "hours")
          .format("HH")}:00`,
        abnormalOrder: 0,
        allOrder: 0,
        effectiveOrder: 0,
        invalidOrder: 0
      }
    ],
    // 无效订单
    invalidData: [],
    // 异常订单
    abnormalData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/dashboard") {
          const params = {
            dateLevel: Number(location.query.frontPageQueryType || 1)
          };
          dispatch({
            type: "updateState",
            payload: {
              dateLevel: location.query.frontPageQueryType
            }
          });
          dispatch({
            type: "getTurnoverReport",
            payload: params
          });
          dispatch({
            type: "getDiagramReport",
            payload: params
          });
          dispatch({
            type: "getDishFanReport",
            payload: params
          });
          dispatch({
            type: "getStoreFanReport",
            payload: params
          });
        }
      });
    }
  },
  effects: {
    *getTurnoverReport({ payload }, { call, put }) {
      const res = yield call(getTurnoverReport, payload);
      const { code, data } = res.data;
      if (code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            turnoverReport: data || []
          }
        });
      }
    },
    *getDiagramReport({ payload }, { call, put }) {
      const res = yield call(getDiagramReport, payload);
      const { code, data } = res.data;
      if (code === "200") {
        // const defaultData = yield select(state => state.dashboard.historyData);
        yield put({
          type: "querySuccess",
          payload: {
            diagramReport: data || []
          }
        });
      }
    },
    *getDishFanReport({ payload }, { call, put }) {
      const res = yield call(getDishFanReport, payload);
      const { code, data } = res.data;
      if (code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            dishFanReport: data || []
          }
        });
      }
    },

    *getStoreFanReport({ payload }, { call, put }) {
      const res = yield call(getStoreFanReport, payload);
      const { code, data } = res.data;
      if (code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            storeFanReport: data || []
          }
        });
      }
    }
  }
});
