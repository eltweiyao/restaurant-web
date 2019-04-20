/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/dishMenu/listMenu", {
    method: "post",
    body: params
  });
}

export async function queryRecipeCount(params) {
  return request("api/dishMenu/queryRecipeCount", {
    method: "post",
    body: params
  });
}

export async function listMenuItem(params) {
  return request("api/dishMenu/listMenuItem", {
    method: "post",
    body: params
  });
}

export async function updateMenu(params) {
  return request("api/dishMenu/updateMenu", {
    method: "post",
    body: JSON.stringify(params)
  });
}

export async function saveMenu(params) {
  return request("api/dishMenu/saveMenu", {
    method: "post",
    body: JSON.stringify(params)
  });
}
