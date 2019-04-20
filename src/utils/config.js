const PAYMENT = "/plAdmin";
// const TEST_PAYMENT = '/test_payment';

module.exports = {
  name: "  连锁门店经营管理系统",
  prefix: "rt-report",
  footerText: "eltweiyao连锁门店经营管理系统 v1.0",
  logo: "./images/logo.png",
  iconFontCSS: "/iconfont.css",
  iconFontJS: "/iconfont.js",
  openPages: [
    "/login",
    "/register",
    "/registerResult",
    "/forgetPassword",
    "/forgetPasswordResult",
    "/password"
  ],
  api: {
    payment: {
      payChannel: `${PAYMENT}`,
      aggregator: `${PAYMENT}`,
      isv: `${PAYMENT}`,
      receiptAccount: `${PAYMENT}`,
      receiptChannel: `${PAYMENT}`,
      receiptShop: `${PAYMENT}`
    }
  }
};
