/*
 * @Author: cuiweiyao
 * @Date: 2018-10-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import {
  inquire,
  saveMenu,
  updateMenu,
  listMenuItem,
  queryRecipeCount
} from "../services/dishMenu";

export default modelExtend(pageModel, {
  namespace: "dishMenu",
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
        if (location.pathname === "/dishMenu") {
          dispatch({
            type: "query",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
          dispatch({
            type: "queryMenuItems"
          });
        }
      });
    }
  },

  effects: {
    // 获取列表
    *query({ payload }, { call, put, select }) {
      const paginationOld = yield select(state => state.dishMenu.pagination);
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
    *queryRecipeCount({ payload }, { call, put }) {
      const response = yield call(queryRecipeCount, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            viewList: data || []
          }
        });
      }
    },
    *queryMenuItems({ payload }, { call, put }) {
      const response = yield call(listMenuItem, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            menuItems: data || []
          }
        });
      } else {
        yield put({
          type: "querySuccess",
          payload: {
            menuItems: []
          }
        });
        message.error("未查询到菜品，请先前往添加菜品");
      }
    },
    // 获取组织机构
    *add({ payload }, { call, put, select }) {
      const response = yield call(saveMenu, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("添加成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.dishMenu.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *edit({ payload }, { call, put, select }) {
      const response = yield call(updateMenu, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.dishMenu.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  },
  reducers: {
    showModalView(state) {
      return { ...state, viewModalVisible: true };
    },
    hideModalView(state) {
      return { ...state, viewModalVisible: false };
    }
  }
});
