const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to Bloccit");
});

router.get("/macro", (req, res, next) => {
  res.send("polo");
});

module.exports = router;
