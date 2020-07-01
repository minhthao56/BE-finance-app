const Finances = require("../models/finance.model");
const mongoose = require("mongoose");
let dayNow = require("../FunctionGetDayOfWeek/FunctionGetDayOfWeek");

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
  res.json(income);
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
  const now = new Date();
  const monthNow = now.getMonth();
  const dateNow = now.getDate();
  const yearNow = now.getFullYear();
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

  const filterExpenseMonth = expense.filter(function(a) {
    const time = new Date(a.time);
    const getMonth = time.getMonth();
    const getYear = time.getFullYear();
    if (getMonth === monthNow && getYear === yearNow) {
      return true;
    } else {
      return false;
    }
  });
  const amountExpenseThisMonth = filterExpenseMonth.map(function(a) {
    return a.amount;
  });
  const sumExpenseThisMonth = amountExpenseThisMonth.reduce(function(a, b) {
    return a + b;
  }, 0);

  const fillterExpenseToday = expense.filter(function(a) {
    const time = new Date(a.time);
    const getMonth = time.getMonth();
    const getYear = time.getFullYear();
    const getDate = time.getDate();
    if (getMonth === monthNow && getYear === yearNow && getDate === dateNow) {
      return true;
    } else {
      return false;
    }
  });

  const mapExpenseToDay = fillterExpenseToday.map(function(a) {
    return a.amount;
  });
  const sumExpenseToDay = mapExpenseToDay.reduce(function(a, b) {
    return a + b;
  }, 0);

  const all = [
    sumIncome,
    sumExpense,
    balance,
    sumExpenseThisMonth,
    sumExpenseToDay
  ];

  res.json(all);
};
// get Expense

module.exports.getExpense = async function(req, res) {
  const id = req.params.id;
  const finance = await Finances.findOne({ idUser: id });
  const expense = finance.expense;
  const sortExpense = expense.sort(function(a, b) {
    let time1 = new Date(a.time);
    let time2 = new Date(b.time);
    let getTime1 = time1.getTime();
    let getTime2 = time2.getTime();
    return getTime2 - getTime1;
  });
  let arri = [];
  for (let i = 0; i < sortExpense.length; i++) {
    if (sortExpense[i + 1] !== undefined) {
      let time1 = new Date(sortExpense[i].time);
      let time2 = new Date(sortExpense[i + 1].time);
      let date1 = time1.getDate();
      let date2 = time2.getDate();
      if (date1 !== date2) {
        arri.push(i);
      }
    }
  }

  let arrExpense = [];
  let arrFrist = sortExpense.slice(0, arri[0] + 1);
  let time = arrFrist[0].time;
  let ojFrist = {
    time: time,
    data: arrFrist
  };
  arrExpense.push(ojFrist);

  for (let i = 0; i < arri.length; i++) {
    if (arri[i + 1] === undefined) {
      let arrFinal = sortExpense.slice(arri[i] + 1);
      let time = arrFinal[0].time;
      let ojFinal = {
        time: time,
        data: arrFinal
      };
      arrExpense.push(ojFinal);
    } else {
      let arrAmong = sortExpense.slice(arri[i] + 1, arri[i + 1] + 1);
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
module.exports.getDataChartLine = async function(req, res) {
  const id = req.params.id;
  const now = new Date();
  const day = now.getDay();
  const month = now.getMonth();
  const pevMonth = month - 1;

  const finance = await Finances.findOne({ idUser: id });
  const expense = finance.expense;
  let dateOfWeek = dayNow.dayWeek(day);

  let dataWeek = [];

  for (let date of dateOfWeek) {
    for (let exp of expense) {
      let time = new Date(exp.time);
      let getDate = time.getDate();
      let getMonth = time.getMonth();
      if (
        (getDate === date && getMonth === month) ||
        (getDate === date && getMonth === pevMonth)
      ) {
        dataWeek.push(exp);
      }
    }
  }

  let arri = [];
  for (let i = 0; i < dataWeek.length; i++) {
    if (dataWeek[i + 1] !== undefined) {
      let time1 = new Date(dataWeek[i].time);
      let time2 = new Date(dataWeek[i + 1].time);
      let date1 = time1.getDate();
      let date2 = time2.getDate();

      if (date1 !== date2) {
        arri.push(i);
      }
    }
  }
  //// if arri = []
  if (arri.length === 0) {
    const mapDataWeek = dataWeek.map(function(a) {
      return a.amount;
    });
    const sumDataWeek = mapDataWeek.reduce(function(a, b) {
      return a + b;
    }, 0);

    let arrDayOfWeek = [0, null, null, null, null, null, null];

    arrDayOfWeek.splice(0, 1, sumDataWeek);

    res.json(arrDayOfWeek);
  } else {
    let dataEachDateOfWeek = [];
    let arrFrist = dataWeek.slice(0, arri[0] + 1);
    dataEachDateOfWeek.push(arrFrist);

    for (let i = 0; i < arri.length; i++) {
      if (arri[i + 1] === undefined) {
        let arrFinal = dataWeek.slice(arri[i] + 1);
        dataEachDateOfWeek.push(arrFinal);
      } else {
        let arrAmong = dataWeek.slice(arri[i] + 1, arri[i + 1] + 1);
        dataEachDateOfWeek.push(arrAmong);
      }
    }
    const sumDateOfWeek = dataEachDateOfWeek.map(function(a) {
      if (Array.isArray(a) === true) {
        let time = a[0].time;
        let changeArr = a.map(function(b) {
          return b.amount;
        });
        let sum = changeArr.reduce(function(c, d) {
          return c + d;
        }, 0);
        return { time: time, sumAmont: sum };
      } else {
        return a;
      }
    });

    let reverseArr = sumDateOfWeek.reverse();
    let mapReverseArr = reverseArr.map(function(sumAndtime) {
      let timeSum = new Date(sumAndtime.time);
      let daySum = timeSum.getDay();
      return daySum;
    });
    let arrDayOfWeek = [1, 2, 3, 4, 5, 6, 0];

    let mapArrDayOfWeek = arrDayOfWeek.map(function(day) {
      if (mapReverseArr.includes(day) === true) {
        return day;
      } else {
        return null;
      }
    });

    for (let timeAndSum of reverseArr) {
      let time = new Date(timeAndSum.time);
      let daySum = time.getDay();
      let sumAmont = timeAndSum.sumAmont;
      let indexOf = mapArrDayOfWeek.indexOf(daySum);
      mapArrDayOfWeek.splice(indexOf, 1, sumAmont);
    }
    res.json(mapArrDayOfWeek);
  }
};
// get data doughnut

module.exports.getDataDoughnut = async function(req, res) {
  const id = req.params.id;
  const finance = await Finances.findOne({ idUser: id });
  const expense = finance.expense;

  const mapExpense = expense.map(function(a) {
    return a.amount;
  });
  const sumExpense = mapExpense.reduce(function(a, b) {
    return a + b;
  });

  const sortExpense = expense.sort(function(a, b) {
    let c = a.title;
    let d = b.title;
    return c.localeCompare(d);
  });
  let arri = [];
  for (let i = 0; i < sortExpense.length; i++) {
    if (sortExpense[i + 1] !== undefined) {
      let title1 = sortExpense[i].title;
      let title2 = sortExpense[i + 1].title;
      if (title1 !== title2) {
        arri.push(i);
      }
    }
  }

  let dataFollowTitle = [];
  let arrFrist = sortExpense.slice(0, arri[0] + 1);
  dataFollowTitle.push(arrFrist);

  for (let i = 0; i < arri.length; i++) {
    if (arri[i + 1] === undefined) {
      let arrFinal = sortExpense.slice(arri[i] + 1);
      dataFollowTitle.push(arrFinal);
    } else {
      let arrAmong = sortExpense.slice(arri[i] + 1, arri[i + 1] + 1);
      dataFollowTitle.push(arrAmong);
    }
  }

  const sumFollowTitle = dataFollowTitle.map(function(a) {
    if (Array.isArray(a) === true) {
      let time = a[0].time;
      let title = a[0].title;
      let color = a[0].color;
      let className = a[0].className;
      let changeArr = a.map(function(b) {
        return b.amount;
      });
      let sum = changeArr.reduce(function(c, d) {
        return c + d;
      }, 0);
      return {
        time: time,
        sumAmont: sum,
        title: title,
        color: color,
        className: className
      };
    } else {
      return a;
    }
  });

  const mapPercentPerTotal = sumFollowTitle.map(function(data) {
    let sumAmont = data.sumAmont;
    let percentSumAmont = (sumAmont / sumExpense) * 100;
    let percentSumAmontFixed = Math.round(percentSumAmont);
    return {
      time: data.time,
      percentSumAmont: percentSumAmontFixed,
      title: data.title,
      color: data.color,
      className: data.className
    };
  });

  res.json(mapPercentPerTotal);
};

// get data chart bar
module.exports.getDataCharBar = async function(req, res) {
  const id = req.params.id;
  const now = new Date();
  const year = now.getFullYear();
  const finance = await Finances.findOne({ idUser: id });
  const expense = finance.expense;
  const sortExpense = expense.sort(function(a, b) {
    let time1 = new Date(a.time);
    let time2 = new Date(b.time);
    let getTime1 = time1.getTime();
    let getTime2 = time2.getTime();
    return getTime2 - getTime1;
  });

  const filterFollowYear = sortExpense.filter(function(data) {
    let time = new Date(data.time);
    let getYear = time.getFullYear();
    if (getYear === year) {
      return true;
    } else {
      return false;
    }
  });

  let arri = [];
  for (let i = 0; i < filterFollowYear.length; i++) {
    if (filterFollowYear[i + 1] !== undefined) {
      let time1 = new Date(filterFollowYear[i].time);
      let time2 = new Date(filterFollowYear[i + 1].time);
      let getMonth1 = time1.getMonth();
      let getMonth2 = time2.getMonth();
      if (getMonth1 !== getMonth2) {
        arri.push(i);
      }
    }
  }

  let dataFollowMonth = [];
  let arrFrist = filterFollowYear.slice(0, arri[0] + 1);
  dataFollowMonth.push(arrFrist);

  for (let i = 0; i < arri.length; i++) {
    if (arri[i + 1] === undefined) {
      let arrFinal = filterFollowYear.slice(arri[i] + 1);
      dataFollowMonth.push(arrFinal);
    } else {
      let arrAmong = filterFollowYear.slice(arri[i] + 1, arri[i + 1] + 1);
      dataFollowMonth.push(arrAmong);
    }
  }

  const sumDateOfMonth = dataFollowMonth.map(function(a) {
    if (Array.isArray(a) === true) {
      let time = a[0].time;
      let changeArr = a.map(function(b) {
        return b.amount;
      });
      let sum = changeArr.reduce(function(c, d) {
        return c + d;
      }, 0);
      return { time: time, sumMonth: sum };
    } else {
      return a;
    }
  });

  let mapArrMonth = sumDateOfMonth.map(function(sumAndtime) {
    let timeSum = new Date(sumAndtime.time);
    let monthSum = timeSum.getMonth();
    return monthSum;
  });

  let arrDayOfMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let mapArrDayOfMonth = arrDayOfMonth.map(function(month) {
    if (mapArrMonth.includes(month) === true) {
      return month;
    } else {
      return null;
    }
  });

  for (let timeAndSum of sumDateOfMonth) {
    let time = new Date(timeAndSum.time);
    let monthSum = time.getMonth();
    let sumMonth = timeAndSum.sumMonth;
    let indexOf = mapArrDayOfMonth.indexOf(monthSum);
    mapArrDayOfMonth.splice(indexOf, 1, sumMonth);
  }

  res.json(mapArrDayOfMonth);
};
// get Income

module.exports.getIncome = async function(req, res) {
  const id = req.params.id;
  const finance = await Finances.findOne({ idUser: id });
  const income = finance.income;

  res.json(income);
};
