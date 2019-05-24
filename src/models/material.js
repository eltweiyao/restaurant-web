/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import {
  inquire,
  saveMaterial,
  updateMaterial,
  listMaterialUnitAll
} from "../services/material";

export default modelExtend(pageModel, {
  namespace: "material",
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
        if (location.pathname === "/material") {
          dispatch({
            type: "query",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
          dispatch({
            type: "queryUnitsAll"
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
      const paginationOld = yield select(state => state.material.pagination);
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
    *queryUnitsAll({ payload }, { call, put }) {
      const response = yield call(listMaterialUnitAll, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            materialUnits: data || []
          }
        });
      } else {
        message.error("未查询到单位，请先前往添加单位");
      }
    },
    // 获取组织机构
    *add({ payload }, { call, put, select }) {
      const response = yield call(saveMaterial, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("添加成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.material.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *edit({ payload }, { call, put, select }) {
      const response = yield call(updateMaterial, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.material.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  }
});
