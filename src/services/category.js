/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/category/listCategory", {
    method: "post",
    body: params
  });
}

export async function updateCategory(params) {
  return request("api/category/updateCategory", {
    method: "post",
    body: params
  });
}

export async function saveCategory(params) {
  return request("api/category/saveCategory", {
    method: "post",
    body: params
  });
}
