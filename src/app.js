import express from "express";
import configViewEngine from "./config/viewEngine";
import upload from "./config/multer";
import Router from "./routes";
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
require("dotenv").config();
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
// const router = express.Router();

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
Router(app);
// require("./routes/router.admin").default(app, upload);
// require("./routes/router.web").default(app, upload);

//* import api router
// require("./routes/api").default(app, router);

app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`);
});
