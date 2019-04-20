/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/material/listMaterialUnit", {
    method: "post",
    body: params
  });
}

export async function updateMaterialUnit(params) {
  return request("api/material/updateMaterialUnit", {
    method: "post",
    body: params
  });
}

export async function saveMaterialUnit(params) {
  return request("api/material/saveMaterialUnit", {
    method: "post",
    body: params
  });
}
