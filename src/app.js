const express = require("express");
const app = express();

const routeConfig = require("./config/route-config.js");
routeConfig.init(app);

//const macro = require("/spec/integration/macro.js")
//app.use('/macro', macro);

module.exports = app;
