const express = require("express");
const app = express();
var cors = require("cors");
const userRouter = require("./routers/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(userRouter);

// connect to db
require("./db/mongoose");

module.exports = app;
