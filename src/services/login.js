import request from "../utils/request";

// 登录接口
export async function enter(params) {
  return request("/api/auth/login ", {
    method: "post",
    body: params
  });
}
// 登出接口
export async function logout(params) {
  return request("/api/auth/logout", {
    method: "post",
    body: params
  });
}
// 获取菜单接口
export async function inquireMenu(params) {
  console.warn(params);
  return request("/api/auth/queryMenu", {
    method: "post",
    body: params
  });
}
