import modelExtend from "dva-model-extend";
import { routerRedux } from "dva/router";
import { parse } from "qs";
import { enter } from "../services/login";
import { saveSession, toStr } from "../utils/";
import { model } from "./common";

export default modelExtend(model, {
  namespace: "login",
  state: {
    id: "",
    deleteFlag: "",
    password: "",
    username: ""
  },
  subscriptions: {},
  effects: {
    // 登陆
    *login({ payload }, { call, put }) {
      const res = yield call(enter, parse(payload));
      const { code, data } = res.data;
      if (code === "200") {
        // yield put({
        //   type: 'querySuccess',
        //   payload: {
        //     deleteFlag: data.deleteFlag,
        //     username: data.username,
        //     password: data.password,
        //     loginId: data.id,
        //   },
        // });
        saveSession("pkCompany", data.pkCompany);
        saveSession("companyName", data.companyName);
        saveSession("accountType", data.accountType);
        saveSession("storeName", data.storeName);
        saveSession("account", data.account);
        yield put({
          type: "queryMenu",
          payload: {
            accountType: data.accountType
          }
        });
        if (data.accountType === 1) {
          yield put(routerRedux.push("/dashboard"));
        } else if(data.accountType === 2) {
          yield put(routerRedux.push("/order"));
        } else {
          yield put(routerRedux.push("/approval"))
        }
      }
    },
    *register({payload},{put}){

      yield put(routerRedux.push("/register"));
    },
    *queryMenu({ payload }, { put }) {
      const { accountType } = payload;
      const touristData = [
      {
        id: "qustion",
        bpid: "",
        mpid: "",
        name: "审核应用",
        icon: "question",
        route: "/approval",
        menu_sort: "1"
      }
    ];
      const userData = [
        {
          id: "orderManager",
          bpid: "",
          mpid: "",
          name: "点菜收银",
          icon: "pay-circle",
          route: "/order",
          menu_sort: "1"
        },
        {
          id: "dishManager",
          bpid: "",
          mpid: "",
          name: "配方管理",
          icon: "book",
          route: "/recipe",
          menu_sort: "2"
        }
      ];
      const adminData = [
        // 系统管理
        {
          id: "dashBoard",
          bpid: "",
          mpid: "",
          name: "首页",
          icon: "area-chart",
          route: "/dashboard",
          menu_sort: "1"
        },
        {
          id: "dishManager",
          bpid: "",
          mpid: "",
          name: "总部管理",
          icon: "cloud",
          route: "",
          menu_sort: "1"
        },
        {
          id: "dishManager01",
          bpid: "dishManager",
          mpid: "dishManager",
          name: "配方管理",
          icon: "",
          route: "/recipe",
          menu_sort: ""
        },
        {
          id: "dishManager02",
          bpid: "dishManager",
          mpid: "dishManager",
          name: "类别管理",
          icon: "",
          route: "/category",
          menu_sort: ""
        },
        {
          id: "dishManager03",
          bpid: "dishManager",
          mpid: "dishManager",
          name: "菜谱管理",
          icon: "",
          route: "/dishMenu",
          menu_sort: ""
        },
        // 任务管理
        {
          id: "storeManage",
          bpid: "",
          mpid: "",
          name: "门店管理",
          icon: "shop",
          route: "/store",
          menu_sort: "1"
        },
        // 统计汇报
        {
          id: "materialManage",
          bpid: "",
          mpid: "",
          name: "原料管理",
          icon: "inbox",
          route: "",
          menu_sort: "1"
        },
        {
          id: "materialManage01",
          bpid: "materialManage",
          mpid: "materialManage",
          name: "物料管理",
          icon: "",
          route: "/material",
          menu_sort: ""
        },
        {
          id: "materialManage02",
          bpid: "materialManage",
          mpid: "materialManage",
          name: "物料单位",
          icon: "",
          route: "/materialUnit",
          menu_sort: ""
        }
      ];
      let data;
      if (accountType === 1) {
        data = adminData;
      } else if (accountType === 2) {
        data = userData;
      } else {
        data = touristData;
      }
      const menuData = data.filter(
        item => item.mpid !== "-1" && item.mpid !== "-2" && item.mpid !== "-3"
      );
      const permissionsData = menuData.map(item => item.id);
      // 把菜单存入session中
      saveSession("menuData", toStr(menuData));
      saveSession("permissionsData", toStr(permissionsData));
      saveSession("accountType", accountType);
      yield put({
        type: "restaurant/updateState",
        payload: {
          menu: menuData,
          permissions: {
            visit: permissionsData
          }
        }
      });
    }
  }
});
