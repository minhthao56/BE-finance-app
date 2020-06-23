const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/users.router");

const port = 8080;

// Cors

app.use(cors());

//Connect monogoBD
const uri =
  "mongodb+srv://minhthao56:minhthao56@cluster0-dfzmq.gcp.mongodb.net/financeApp?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connecting to momgoDB cloud...");
});

// Request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie
app.use(cookieParser());
// End  point
app.use("/users", userRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
