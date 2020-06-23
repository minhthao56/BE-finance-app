const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/user.controller");

// Create user
router.post("/signup", controller.createUser);
// Login
// router.post("/login", controller.login);
//Update inform user
// router.post("/update", upload.single("file"), controller.updateInfoUser);
// // Get detal data user
// router.get("/user/:id", controller.detailUser);
// // Check logged in?
// router.post("/checklogin", controller.checkLoggedIn);
// // Fotgot pass
// router.post("/forgot", controller.fogotPass);

module.exports = router;
