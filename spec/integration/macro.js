const express = require("express");
const macro = express.Router();

macro.get("/", (req, res, next) => {
  res.send("polo");
});

module.exports = macro;
