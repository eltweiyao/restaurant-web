/*
 * @Author: cuiweiyao
 * @Date: 2018-10-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import {
  inquire,
  listMenu,
  saveStore,
  updateStore,
  deleteStore
} from "../services/store";

export default modelExtend(pageModel, {
  namespace: "store",
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
        if (location.pathname === "/store") {
          dispatch({
            type: "query",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
          dispatch({
            type: "queryMenus"
          });
        }
      });
    }
  },

  effects: {
    // 获取列表
    *query({ payload }, { call, put, select }) {
      const paginationOld = yield select(state => state.store.pagination);
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
    *queryMenus({ payload }, { call, put }) {
      const response = yield call(listMenu, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            menus: data || []
          }
        });
      } else {
        yield put({
          type: "querySuccess",
          payload: {
            menus: []
          }
        });
        message.error("未查询到菜谱，请先前往添加菜品");
      }
    },
    // 获取组织机构
    *add({ payload }, { call, put, select }) {
      const response = yield call(saveStore, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("添加成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.store.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *edit({ payload }, { call, put, select }) {
      const response = yield call(updateStore, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.store.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  },
  *deleteStore({ payload }, { call, put, select }) {
    const response = yield call(deleteStore, payload);
    const { code } = response.data;
    if (code === "200") {
      message.success("删除成功");
    }
    yield put({ type: "hideModal" });
    const searchData = yield select(state => state.store.searchData);
    yield put({
      type: "query",
      payload: {
        ...searchData
      }
    });
  }
});
