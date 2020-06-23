const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "weojdjkfjowewejfwefjiwewefj";
const sgMail = require("@sendgrid/mail");
const shortid = require("shortid");
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
    await Users.insertMany(req.body);
    res.json(req.body);
  }
};
