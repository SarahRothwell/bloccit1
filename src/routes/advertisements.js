const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/advertisements", adController.index);
router.get("/advertisements/new", adController.new);
router.post("/advertisements/create", adController.create);
router.get("/advertisements/:id", adController.show);
router.post("/advertisements/:id/destroy", adController.destroy);
router.get("/advertisements/:id/edit", adController.edit);
router.post("/advertisements/:id/update", adController.update);

module.exports = router;
