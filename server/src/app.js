const express = require("express");
const app = express();
var cors = require("cors");
const userRouter = require("./routers/user");
const phoneRouter = require("./routers/phone");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(userRouter);
app.use(phoneRouter);

// connect to db
require("./db/mongoose");

module.exports = app;
