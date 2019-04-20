import modelExtend from "dva-model-extend";
import { routerRedux } from "dva/router";
import { message } from "antd/lib/index";
import { menuList } from "../services/app";
import { logout } from "../services/login";
import {
  makeMenu,
  getUserInfo,
  getSession,
  toJson,
  delSession,
  config
} from "../utils/";
import { model } from "./common";

const { prefix } = config;
const localStorage = window.localStorage;
const document = window.document;
const location = window.location;
const winWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export default modelExtend(model, {
  namespace: "pm",
  state: {
    //  isLogin: false,
    permissions: {
      visit: []
    },
    menu: [],
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === "true",
    darkTheme: false, // 风格定为深色
    isNavbar: winWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || []
    // 基础资料
  },
  subscriptions: {
    setup({ dispatch }) {
      // 设定模块subscription的emit事件的flag
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({
            type: "autoSwitchSider"
          });
        }, 300);
      };
      // 在登录状态下请求菜单按钮相关信息,页面刷新的时候应该重新请求到
      if (getSession("accountType")) {
        dispatch({
          type: "reloadMenu",
          payload: {}
        });
      }
    }
  },
  effects: {
    *changeNavbar({ payload }, { put, select }) {
      const { report } = yield select(_ => _);
      const isNavbar = winWidth < 769;
      if (isNavbar !== report.isNavbar) {
        yield put({ type: "handleNavbar", payload: isNavbar });
      }
    },
    // 从缓存里读取菜单
    *reloadMenu({ payload }, { put }) {
      const menuData = getSession("menuData")
        ? toJson(getSession("menuData"))
        : [];
      const permissionsData = getSession("permissionsData")
        ? toJson(getSession("permissionsData"))
        : [];
      // 如果缓存中的cloudMenuTree不为空，那么就执行更新菜单操作
      if (menuData && permissionsData) {
        yield put({
          type: "updateState",
          payload: {
            menu: menuData,
            permissions: {
              visit: permissionsData
            }
          }
        });
      }
    },
    // 登陆检测
    *checkLogin() {
      const user = yield getSession("user");
      if (!user) {
        window.location = `${location.origin}/index.html#/login`;
      }
    },
    // 获取菜单列表
    *getMenuList(payload, { put, call }) {
      const { data } = yield call(menuList);
      // 有菜单权限 并且 已经完善商户信息 才展示菜单
      if (data.success && getUserInfo().tenName) {
        yield put({
          type: "showMenu",
          menuData: makeMenu(data.data)
        });
      } else {
        yield put({ type: "hideMenu" });
      }
    },
    // 登出系统
    *logOut({ payload }, { call, put }) {
      message.success("退出登录成功！");
      delSession("user");
      delSession("menuData");
      delSession("permissionsData");
      const dataList = yield call(logout);
      if (dataList.data.code === "200") {
        message.success("退出登录成功！");
        delSession("user");
        delSession("menuData");
        delSession("permissionsData");
        yield put(routerRedux.push("/login"));
      } else {
        message.warning(`${dataList.data.msg}`);
      }
    }
  },
  reducers: {
    autoSwitchSider(state) {
      const siderFold = document.body.clientWidth < 769;
      if (siderFold) {
        localStorage.setItem(`${prefix}siderFold`, siderFold);
        return {
          ...state,
          siderFold
        };
      }
      return state;
    },

    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold
      };
    },

    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      };
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload
      };
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys
      };
    }
  }
});
