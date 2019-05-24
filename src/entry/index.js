import dva from "dva";
import createLoading from "dva-loading";
import "./index.less";

// 1. Initialize
const app = dva({
  onError(error) {
    console.error(error);
  }
});

// 2. Plugins
app.use(
  createLoading({
    effects: true
  })
);

// 3. Model
app.model(require("../models/app"));
app.model(require("../models/login"));
app.model(require("../models/material"));
app.model(require("../models/recipe"));
app.model(require("../models/materialUnit"));
app.model(require("../models/category"));
app.model(require("../models/dishMenu"));
app.model(require("../models/store"));
app.model(require("../models/order"));
app.model(require("../models/dashboard"));
app.model(require("../models/register"));
app.model(require("../models/approval"));

// 4. Router
app.router(require("../routes"));

// 5. Start
app.start("#root");
