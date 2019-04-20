/*
 * @Author: cuiweiyao
 * @Date: 2018-10-12 10:00:33
 */
import modelExtend from "dva-model-extend";
import { message } from "antd";
import { pageModel } from "./common";
import {
  inquire,
  saveRecipe,
  addRecipeMaterial,
  listMaterialAll,
  updateRecipeMaterial,
  updateRecipeInfo,
  deleteRecipeMaterial,
  listCategoryAll,
  deleteRecipe
} from "../services/recipe";
import { saveSession, getSession, toStr } from "../utils/";

export default modelExtend(pageModel, {
  namespace: "recipe",
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
        if (location.pathname === "/recipe") {
          dispatch({
            type: "query",
            payload: {
              pageno: 1,
              rowcount: 10
            }
          });
          dispatch({
            type: "queryMaterialAll"
          });
          dispatch({
            type: "queryCategoryAll"
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
      console.log("pkCompany", getSession("pkCompany"));
      const paginationOld = yield select(state => state.recipe.pagination);
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
    *queryMaterialAll({ payload }, { call, put }) {
      const response = yield call(listMaterialAll, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            materials: data || []
          }
        });
      } else {
        message.error("未查询到物料，请先前往添加物料");
      }
    },
    *queryCategoryAll({ payload }, { call, put }) {
      const response = yield call(listCategoryAll, payload);
      const { data, code } = response.data;
      if (data !== [] && code === "200") {
        yield put({
          type: "querySuccess",
          payload: {
            categories: data || []
          }
        });
      } else {
        message.error("未查询到物料，请先前往添加物料");
      }
    },
    // 获取组织机构
    *addRecipe({ payload }, { call, put, select }) {
      const response = yield call(saveRecipe, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("添加成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *addRecipeMaterial({ payload }, { call, put, select }) {
      const response = yield call(addRecipeMaterial, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *updateRecipeMaterial({ payload }, { call, put, select }) {
      const response = yield call(updateRecipeMaterial, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *updateRecipeInfo({ payload }, { call, put, select }) {
      console.log("payload", payload);
      const response = yield call(updateRecipeInfo, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("修改成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *deleteRecipeMaterial({ payload }, { call, put, select }) {
      const response = yield call(deleteRecipeMaterial, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("删除成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    },
    *deleteRecipe({ payload }, { call, put, select }) {
      const response = yield call(deleteRecipe, payload);
      const { code } = response.data;
      if (code === "200") {
        message.success("删除成功");
      }
      yield put({ type: "hideModal" });
      const searchData = yield select(state => state.recipe.searchData);
      yield put({
        type: "query",
        payload: {
          ...searchData
        }
      });
    }
  }
});
