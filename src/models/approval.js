/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import {
  inquire,
  reject,
  agree
} from "../services/approval";
import { saveSession, getSession, toStr } from "../utils/";

export default modelExtend(pageModel, {
  namespace: "approval",
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
        if (location.pathname === "/approval") {
          dispatch({
            type: "query",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
          dispatch({
            type: "updateState",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
        }
      });
    }
  },

  effects: {
    // 获取列表
    *query({ payload }, { call, put, select }) {
      const paginationOld = yield select(
        state => state.approval.pagination
      );
      const response = yield call(inquire, payload);
      const { data, code, page } = response.data;
      if (code === "200") {
        console.log("data",data);
        yield put({
          type: "querySuccess",
          payload: {
            dataList: data || [],
            accountType: getSession("accountType") || 3,
            pagination: {
              ...paginationOld,
              total: page.total || 0,
              current: page.pageno || 1,
              pageSize: page.rowcount || 10
            }
          }
        });
      }
    },
    // 获取组织机构
    *agree({ payload }, { call, put, select }) {
      const response = yield call(agree, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("授权成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.approval.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *reject({ payload }, { call, put, select }) {
      const response = yield call(reject, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("删除成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.approval.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  }
});
