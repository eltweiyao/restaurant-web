/*
 * @Author: cuiweiyao
 * @Date: 2018-10-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import { inquire, saveCategory, updateCategory } from "../services/category";

export default modelExtend(pageModel, {
  namespace: "category",
  state: {
    searchData: {
      categoryName: "",
      pageno: 1,
      rowcount: 10
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/category") {
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
      const paginationOld = yield select(state => state.category.pagination);
      const response = yield call(inquire, payload);
      const { data, code, page } = response.data;
      if (code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            dataList: data || [],
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
    *add({ payload }, { call, put, select }) {
      const response = yield call(saveCategory, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("添加成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.category.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *edit({ payload }, { call, put, select }) {
      const response = yield call(updateCategory, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.category.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  }
});
