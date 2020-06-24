const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/finance.controller");

router.post("/income", controller.Income);

module.exports = router;
