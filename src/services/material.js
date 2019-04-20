/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/material/listMaterial", {
    method: "post",
    body: params
  });
}

export async function listMaterialUnitAll(params) {
  return request("api/material/listMaterialUnitAll", {
    method: "post",
    body: params
  });
}

export async function updateMaterial(params) {
  return request("api/material/updateMaterial", {
    method: "post",
    body: JSON.stringify(params)
  });
}

export async function saveMaterial(params) {
  return request("api/material/saveMaterial", {
    method: "post",
    body: JSON.stringify(params)
  });
}
