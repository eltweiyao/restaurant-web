/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/order/listCategory", {
    method: "post",
    body: params
  });
}

export async function createOrder(params) {
  return request("api/order/createOrder", {
    method: "post",
    body: JSON.stringify(params.orders)
  });
}
