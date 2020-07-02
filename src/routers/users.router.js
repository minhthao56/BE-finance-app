const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/user.controller");

// Create user
router.post("/signup", controller.createUser);
//Login
router.post("/login", controller.login);
// Update inform user
router.post("/update", upload.single("file"), controller.updateInfoUser);
// Check logged in?
router.post("/checklogin", controller.checkLoggedIn);
// // Fotgot pass
// router.post("/forgot", controller.fogotPass);
router.post("/currency", controller.addCurrencyDefault);
module.exports = router;
