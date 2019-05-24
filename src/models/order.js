/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { pageModel } from "./common";
import { message } from "antd";
import { inquire, createOrder } from "../services/order";

export default modelExtend(pageModel, {
  namespace: "order",
  state: {
    searchData: {
      unitName: "",
      pageno: 1,
      rowcount: 10
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/order") {
          dispatch({
            type: "query"
          });
        }
      });
    }
  },

  effects: {
    // 获取列表
    *query({ payload }, { call, put }) {
      const response = yield call(inquire, payload);
      const { data, code } = response.data;
      console.log("data", data);
      if (code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            dataList: data || [],
            result: {}
          }
        });
      }
    },
    *createOrder({ payload }, { call, put }) {
      console.log("payload", payload);
      const response = yield call(createOrder, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("下单成功");
        yield put({
          type: "querySuccess",
          payload: {
            result: {},
            totalPrice: 0
          }
        });
        yield put({
          type: "query"
        });
      }
    }
  }
});
