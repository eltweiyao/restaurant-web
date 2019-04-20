export default {
  entry: "src/entry/*.js",
  disableCSSModules: false,
  multipage: true,
  hash: true,
  autoprefixer: {
    browsers: ["last 2 versions"]
  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", { libraryName: "antd", style: true }]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        "dva-hmr",
        ["import", { libraryName: "antd", style: "css" }]
      ]
    }
  },
  proxy: {
    "/api/": {
      target: "http://127.0.0.1:9090",
      changeOrigin: true
    }
  }
};
