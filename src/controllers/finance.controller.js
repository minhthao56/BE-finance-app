const Finances = require("../models/finance.model");
const mongoose = require("mongoose");

module.exports.Income = async function(req, res) {
  const body = req.body;
  const _id = mongoose.Types.ObjectId();
  const time = new Date();
  const amount = parseInt(body.amount);

  const income = {
    _id: _id,
    time: time,
    amount: amount
  };

  await Finances.findOneAndUpdate(
    { idUser: body.idUser },
    {
      $addToSet: { income: income }
    },
    { upsert: true, new: true, runValidators: true }
  );
};
