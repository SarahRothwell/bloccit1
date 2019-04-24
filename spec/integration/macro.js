const express = require("express");
const macro = express.Router();

router.get("/", (req, res, next) => {
  res.send("polo");
});

module.exports = macro;
