const mongoose = require("mongoose");

let financeSchema = new mongoose.Schema(
  {
    idUser: String,
    income: Array,
    expense: Array
  },
  {
    timestamps: true
  }
);
let Finances = mongoose.model("Finances", financeSchema, "finances");
module.exports = Finances;
