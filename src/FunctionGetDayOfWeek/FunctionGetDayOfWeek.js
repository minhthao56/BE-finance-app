module.exports.dayWeek = function(dayNow) {
  let now = new Date();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  let dayWeek = [];
  ////////////////////////////1
  if (dayNow === 1) {
    dayWeek.push(date);
    return dayWeek;
  }
  //////////////////////////2
  if (dayNow === 2) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }
  ///////////////////////////////////////3
  if (dayNow === 3) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 1 === 0) {
      dayWeek.push(dayWeek[1] - 1);
    }

    if (date - 1 !== 0 && date - 2 !== 0) {
      dayWeek.push(date - 2);
    }
    if (date - 2 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }

  ///////////////////////////////////////4
  if (dayNow === 4) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 1 === 0) {
      dayWeek.push(dayWeek[1] - 1);
    }
    if (date - 1 !== 0 && date - 2 !== 0) {
      dayWeek.push(date - 2);
    }
    if (date - 2 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    if (date - 2 === 0 || date - 1 === 0) {
      dayWeek.push(dayWeek[2] - 1); /// day -3
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0) {
      dayWeek.push(date - 3);
    }
    if (date - 3 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }

  ///////////////////////////////////////5
  if (dayNow === 5) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 1 === 0) {
      dayWeek.push(dayWeek[1] - 1);
    }
    if (date - 1 !== 0 && date - 2 !== 0) {
      dayWeek.push(date - 2);
    }
    if (date - 2 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    if (date - 2 === 0 || date - 1 === 0) {
      dayWeek.push(dayWeek[2] - 1); /// day -3
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0) {
      dayWeek.push(date - 3);
    }
    if (date - 3 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 2 === 0 || date - 1 === 0 || date - 3 === 0) {
      dayWeek.push(dayWeek[3] - 1); /// day -4
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0 && date - 4 !== 0) {
      dayWeek.push(date - 4);
    }

    if (date - 4 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }

  ///////////////////////////////////////6
  if (dayNow === 6) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 1 === 0) {
      dayWeek.push(dayWeek[1] - 1);
    }
    if (date - 1 !== 0 && date - 2 !== 0) {
      dayWeek.push(date - 2);
    }
    if (date - 2 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    if (date - 2 === 0 || date - 1 === 0) {
      dayWeek.push(dayWeek[2] - 1); /// day -3
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0) {
      dayWeek.push(date - 3);
    }
    if (date - 3 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 2 === 0 || date - 1 === 0 || date - 3 === 0) {
      dayWeek.push(dayWeek[3] - 1); /// day -4
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0 && date - 4 !== 0) {
      dayWeek.push(date - 4);
    }

    if (date - 4 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 2 === 0 || date - 1 === 0 || date - 3 === 0 || date - 4 === 0) {
      dayWeek.push(dayWeek[4] - 1); /// day -5
    }

    if (
      date - 1 !== 0 &&
      date - 2 !== 0 &&
      date - 3 !== 0 &&
      date - 4 !== 0 &&
      date - 5 !== 0
    ) {
      dayWeek.push(date - 5);
    }

    if (date - 5 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }

  ///////////////////////////////////////0
  if (dayNow === 0) {
    dayWeek.push(date);

    if (date - 1 !== 0) {
      dayWeek.push(date - 1);
    }
    if (date - 1 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 1 === 0) {
      dayWeek.push(dayWeek[1] - 1);
    }
    if (date - 1 !== 0 && date - 2 !== 0) {
      dayWeek.push(date - 2);
    }
    if (date - 2 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    if (date - 2 === 0 || date - 1 === 0) {
      dayWeek.push(dayWeek[2] - 1); /// day -3
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0) {
      dayWeek.push(date - 3);
    }
    if (date - 3 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 2 === 0 || date - 1 === 0 || date - 3 === 0) {
      dayWeek.push(dayWeek[3] - 1); /// day -4
    }

    if (date - 1 !== 0 && date - 2 !== 0 && date - 3 !== 0 && date - 4 !== 0) {
      dayWeek.push(date - 4);
    }

    if (date - 4 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (date - 2 === 0 || date - 1 === 0 || date - 3 === 0 || date - 4 === 0) {
      dayWeek.push(dayWeek[4] - 1); /// day -5
    }

    if (
      date - 1 !== 0 &&
      date - 2 !== 0 &&
      date - 3 !== 0 &&
      date - 4 !== 0 &&
      date - 5 !== 0
    ) {
      dayWeek.push(date - 5);
    }

    if (date - 5 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }

    if (
      date - 2 === 0 ||
      date - 1 === 0 ||
      date - 3 === 0 ||
      date - 4 === 0 ||
      date - 5 === 0
    ) {
      dayWeek.push(dayWeek[5] - 1); /// day -6
    }

    if (
      date - 1 !== 0 &&
      date - 2 !== 0 &&
      date - 3 !== 0 &&
      date - 4 !== 0 &&
      date - 5 !== 0 &&
      date - 6 !== 0
    ) {
      dayWeek.push(date - 6);
    }

    if (date - 6 === 0) {
      if (
        month === 0 ||
        month === 1 ||
        month === 3 ||
        month === 7 ||
        month === 8 ||
        month === 10
      ) {
        dayWeek.push(31);
      } else if (month === 1 && year % 4 === 0) {
        dayWeek.push(29);
      } else if (month === 1 && year % 4 !== 0) {
        dayWeek.push(28);
      } else {
        dayWeek.push(30);
      }
    }
    return dayWeek;
  }
};
