const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/finance.controller");

router.post("/income", controller.Income);
// expense
router.post("/expense", controller.Expense);
// balance
router.get("/balance/:id", controller.Balance);
//get Balance
router.get("/get/expense/:id", controller.getExpense);
//get chart line
router.get("/get/chartline/:id", controller.getDataChartLine);
//get chart Doughnut
router.get("/get/doughnut/:id", controller.getDataDoughnut);
//get chart Bar
router.get("/get/charbar/:id", controller.getDataCharBar);
// get Income
router.get("/income/:id", controller.getIncome);

module.exports = router;
