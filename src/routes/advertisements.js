const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/advertisements", adController.index);
router.get("/advertisements", adController.new);
router.get("/advertisements", adController.create);

module.exports = router;
