/*
 * @Author: cuiweiyao
 * @Date: 2019-01-18 14:02:18
 * @Last Modified by:   cuiweiyao
 * @Last Modified time: 2019-01-18 14:02:18
 */

import request from "../utils/request";

export async function inquire(params) {
  return request("api/recipe/listRecipe", {
    method: "post",
    body: params
  });
}

export async function listMaterialAll() {
  return request("api/material/listMaterialAll", {
    method: "post"
  });
}

export async function listCategoryAll() {
  return request("api/category/listCategoryAll", {
    method: "post"
  });
}

export async function addRecipeMaterial(params) {
  return request(`api/recipe/addRecipeMaterial?pkRecipe=${params.pkRecipe}`, {
    method: "post",
    body: JSON.stringify(params.materials)
  });
}

export async function updateRecipeMaterial(params) {
  return request("api/recipe/updateRecipeMaterial", {
    method: "post",
    body: params
  });
}

export async function updateRecipeInfo(params) {
  console.log("paramss", params);
  return request("api/recipe/updateRecipeInfo", {
    method: "post",
    body: params
  });
}

export async function deleteRecipeMaterial(params) {
  console.log("deleteRecipeMaterial", params);
  return request("api/recipe/deleteRecipeMaterial", {
    method: "post",
    body: params
  });
}

export async function deleteRecipe(params) {
  console.log("deleteRecipe", params);
  return request("api/recipe/deleteRecipe", {
    method: "post",
    body: params
  });
}

export async function saveRecipe(params) {
  return request("api/recipe/saveRecipe", {
    method: "post",
    body: JSON.stringify(params)
  });
}
