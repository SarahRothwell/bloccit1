const express = require("express");
const marco = express.Router();
marco.get("/", (req, res, next) => {
  res.send("polo");
});

module.exports = marco;
