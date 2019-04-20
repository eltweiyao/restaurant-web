/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function getTurnoverReport(params) {
  return request("/api/order/getTurnoverReport", {
    method: "post",
    body: params
  });
}

export async function getDiagramReport(params) {
  return request("/api/order/getDiagramReport", {
    method: "post",
    body: params
  });
}

export async function getDishFanReport(params) {
  return request("/api/order/getDishFanReport", {
    method: "post",
    body: params
  });
}

export async function getStoreFanReport(params) {
  return request("/api/order/getStoreFanReport", {
    method: "post",
    body: params
  });
}
