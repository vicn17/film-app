import express from "express";
import configViewEngine from "./config/viewEngine";
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
require("dotenv").config();
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
const port = process.env.port || 8080;

//* cookie parser
app.use(cookieParser());

//* creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;

//* session middleware
app.set("trust proxy", 1);
app.use(
  sessions({
    secret: "account_user",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60 * 60 * 24 * 15 },
  })
);

//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//* parse application/json
app.use(bodyParser.json());

//* Use view engine EJS
configViewEngine(app);

//* import router
require("./routes/router").default(app, router, upload);

//* import api router
// require("./routes/api").default(app, router);

app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`);
});
