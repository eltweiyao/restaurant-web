/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/store/listStore", {
    method: "post",
    body: params
  });
}

export async function deleteStore(params) {
  return request("api/store/deleteStore", {
    method: "post",
    body: params
  });
}

export async function listMenu(params) {
  return request("api/store/listMenu", {
    method: "post",
    body: params
  });
}

export async function updateStore(params) {
  return request("api/store/updateStore", {
    method: "post",
    body: JSON.stringify(params)
  });
}

export async function saveStore(params) {
  return request("api/store/saveStore", {
    method: "post",
    body: JSON.stringify(params)
  });
}
