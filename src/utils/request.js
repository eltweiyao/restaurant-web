import fetch from "dva/fetch";
import { stringify } from "qs";
import { message } from "antd";
import { getFormData } from "./index";

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let newOptions;
  let newUrl = url;
  let responseBody = {};
  const { body, params } = options;
  // 判断请求类型
  if (!(typeof body === "string") && body) {
    newOptions = Object.assign({}, options, { body: getFormData(body) });
    responseBody = {
      credentials: "same-origin",
      ...newOptions
    };
  } else {
    newOptions = options;
    responseBody = {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      ...newOptions
    };
  }
  // get
  if (params) {
    newUrl += `?${stringify(params)}`;
  }
  const response = await fetch(newUrl, responseBody);

  if (response.status === 302) {
    message.error("未获取到当前登录人权限信息！");
    window.location = `${location.origin}/index.html#/login`;
  } else if (response.status !== 200) {
    message.error("网络或服务器异常！");
    return {
      data: {
        code: response.status
      }
    };
  }

  const data = await response.json();
  if (data.code !== "10000" && data.code !== "200") {
    message.error(data.msg);
    if (data.code === "302") {
      // 是否需要重定向
    }
  }
  return { data };
}
