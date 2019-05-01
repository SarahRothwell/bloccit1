const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/advertisements", adController.index);
router.get("/advertisements/new", adController.new);
router.post("/advertisements/create", adController.create);
router.get("/advertisements/:id", adController.show);
router.post("/advertisements/:id/destroy", adController.destroy);

module.exports = router;
