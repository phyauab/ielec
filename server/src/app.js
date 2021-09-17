const express = require("express");
const app = express();
var cors = require("cors");
const userRouter = require("./routers/user");
const phoneRouter = require("./routers/phone");
const laptopRouter = require("./routers/laptop");
const headphoneRouter = require("./routers/headphone");
const accessoriesRouter = require("./routers/accessories");
const productRouter = require("./routers/product");
const brandRouter = require("./routers/brand");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(userRouter);
app.use(phoneRouter);
app.use(laptopRouter);
app.use(headphoneRouter);
app.use(accessoriesRouter);
app.use(productRouter);
app.use(brandRouter);

// connect to db
require("./db/mongoose");

module.exports = app;
