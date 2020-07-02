const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "weojdjkfjowewejfwefjiwewefj";
const sgMail = require("@sendgrid/mail");
const shortid = require("shortid");
// const shortid = require("shortid");
const Finances = require("../models/finance.model");
sgMail.setApiKey(
  "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"
);
//Cloudinary
cloudinary.config({
  cloud_name: "du4arxzzj",
  api_key: "821499727673838",
  api_secret: "hDcEoltxpFdpSkkBeffwV7-Rqso"
});

//Create User
module.exports.createUser = async function(req, res) {
  const email = req.body.email;
  const user = await Users.findOne({ email: email });
  if (user) {
    res.status(400);
    res.json({ msg: "Email already exists" });
  } else {
    req.body.avatarUrl =
      "https://res.cloudinary.com/du4arxzzj/image/upload/v1590497543/user_lp41pe.png";
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const user = await Users.insertMany(req.body);
    const idUser = user[0]._id.toString();
    const addMoney = {
      idUser: idUser,
      income: [],
      expense: []
    };
    const a = await Finances.insertMany(addMoney);
    console.log(a);

    res.json(req.body);
  }
};

//Loign
module.exports.login = async function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Users.findOne({ email: email });
  if (!user) {
    res.status(401);
    res.json({ msg: "Email wrong" });
  } else if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ msg: "Password wrong" });
  } else {
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    res.header("auth-token", token);
    const newuser = {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      token: token
    };
    res.json(newuser);
  }
};

// Check logged
module.exports.checkLoggedIn = async function(req, res) {
  const token = req.body.token;

  if (!token) {
    return;
  }
  const verified = jwt.verify(token, TOKEN_SECRET);
  const user = await Users.findOne({ _id: verified._id });

  res.json(user);
};
// Update inform user
module.exports.updateInfoUser = async function(req, res) {
  const body = req.body;

  if (req.file !== undefined) {
    const path = req.file.path;
    let result = await cloudinary.uploader.upload(path, function(
      error,
      result
    ) {
      console.log(error);
    });
    const avatarUrl = result.url;
    await Users.findByIdAndUpdate(
      { _id: body._id },
      {
        $set: { avatarUrl: avatarUrl }
      }
    );
  }
  if (body.name !== "" && body.name !== "undefined") {
    const name = body.name;
    await Users.findByIdAndUpdate(
      { _id: body._id },
      {
        $set: { name: name }
      }
    );
  }
  if (body.email !== "" && body.email !== "undefined") {
    const email = body.email;
    await Users.findByIdAndUpdate(
      { _id: body._id },
      {
        $set: { email: email }
      }
    );
  }
  if (body.pass !== "undefined" && body.pass !== "") {
    const pass = body.pass;
    const password = bcrypt.hashSync(pass, 10);
    await Users.findByIdAndUpdate(
      { _id: body._id },
      {
        $set: { password: password }
      }
    );
  }

  res.json(body);
};

module.exports.addCurrencyDefault = async function(req, res) {
  const body = req.body;
  const User = await Users.findOneAndUpdate(
    { _id: body.idUser },
    {
      $set: { defaultCurrency: body.sign }
    }
  );
  res.json(User);
};
// Forget password
module.exports.fogotPass = async function(req, res) {
  const email = req.body.email;

  const pass = shortid.generate();
  const password = bcrypt.hashSync(pass, 10);
  const msg = {
    to: email,
    from: "minhthao1111@outlook.com",
    subject: "New Password",
    text: "You should check your accout and change your password right now.",
    html: "New your passwor is " + pass
  };

  await Users.findOneAndUpdate(
    {
      email: email
    },
    { $set: { password: password } }
  );
  await sgMail.send(msg);

  res.json("ok nha");
};
