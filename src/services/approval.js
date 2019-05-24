import request from "../utils/request";

// 查询账户
export async function inquire(params) {
  return request("/api/approval/listAccount ", {
    method: "post",
    body: params
  });
}
// 授权 
export async function agree(params) {
  return request("/api/approval/agree", {
    method: "post",
    body: params
  });
}
// 删除账户
export async function reject(params) {
  console.warn(params);
  return request("/api/approval/reject", {
    method: "post",
    body: params
  });
}
