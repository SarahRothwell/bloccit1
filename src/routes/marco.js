const express = require("express");
const app = express.Router();
app.get("/marco", (req, res, next) => {
  res.send("polo");
});

module.exports = app;
