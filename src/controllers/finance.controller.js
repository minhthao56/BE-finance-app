const Finances = require("../models/finance.model");
const mongoose = require("mongoose");

// income
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
// expense
module.exports.Expense = async function(req, res) {
  const body = req.body;
  const idUser = body.idUser;
  const _id = mongoose.Types.ObjectId();
  const amount = parseInt(body.amount);
  const inFoExpense = {
    _id: _id,
    time: body.time,
    title: body.title,
    color: body.color,
    className: body.className,
    amount: amount,
    des: body.des
  };
  const expense = await Finances.findOneAndUpdate(
    { idUser: idUser },
    {
      $addToSet: { expense: inFoExpense }
    },
    {
      upsert: true,
      new: true,
      runValidators: true
    }
  );

  res.json(expense);
};
// get balance

module.exports.Balance = async function(req, res) {
  const id = req.params.id;

  const finance = await Finances.findOne({ idUser: id });

  const income = finance.income;
  const mapIncome = income.map(function(a) {
    return a.amount;
  });
  const sumIncome = mapIncome.reduce(function(a, b) {
    return a + b;
  });

  const expense = finance.expense;
  const mapExpense = expense.map(function(a) {
    return a.amount;
  });
  const sumExpense = mapExpense.reduce(function(a, b) {
    return a + b;
  });

  const balance = sumIncome - sumExpense;

  res.json(balance);
};
// get Expense

module.exports.getExpense = async function(req, res) {
  const id = req.params.id;
  const finance = await Finances.findOne({ idUser: id });
  const expense = finance.expense;
  let arri = [];
  for (let i = 0; i < expense.length; i++) {
    if (expense[i + 1] !== undefined) {
      let time1 = new Date(expense[i].time);
      let time2 = new Date(expense[i + 1].time);
      let date1 = time1.getDate();
      let date2 = time2.getDate();
      if (date1 !== date2) {
        arri.push(i);
      }
    }
  }

  let arrExpense = [];
  let arrFrist = expense.slice(0, arri[1] - 1);
  let time = arrFrist[0].time;
  let ojFrist = {
    time: time,
    data: arrFrist
  };
  arrExpense.push(ojFrist);

  for (let i = 0; i < arri.length; i++) {
    if (arri[i + 1] === undefined) {
      let arrFinal = expense.slice(arri[i] + 1);
      let time = arrFinal[0].time;
      let ojFinal = {
        time: time,
        data: arrFinal
      };
      arrExpense.push(ojFinal);
    } else {
      let arrAmong = expense.slice(arri[i] + 1, arri[i + 1] + 1);
      let time = arrAmong[0].time;
      let ojAmong = {
        time: time,
        data: arrAmong
      };
      arrExpense.push(ojAmong);
    }
  }
  res.json(arrExpense);
};
// get data chart line
