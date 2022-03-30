const express = require("express");
const app = express();
var cors = require("cors");

const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const brandRouter = require("./routers/brand");
const cartItemRouter = require("./routers/cartItem");
const transactionRouter = require("./routers/transaction");
const adminRouter = require("./routers/admin");
const imageRouter = require("./routers/image");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(userRouter);
app.use(brandRouter);
app.use(productRouter);
app.use(cartItemRouter);
app.use(transactionRouter);
app.use(adminRouter);
app.use(imageRouter);

// connect to db
require("./db/mongoose");

module.exports = app;
