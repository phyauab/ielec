const express = require("express");
const app = express();
var cors = require("cors");

const userRouter = require("./routers/user");
const productRouter = require("./routers/product/product");
const phoneRouter = require("./routers/product/discriminators/phone");
const laptopRouter = require("./routers/product/discriminators/laptop");
const headphoneRouter = require("./routers/product/discriminators/headphone");
const accessoriesRouter = require("./routers/product/discriminators/accessories");
const brandRouter = require("./routers/brand");
const colorRouter = require("./routers/options/color");
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
app.use(colorRouter);
app.use(phoneRouter);
app.use(productRouter);
app.use(cartItemRouter);
app.use(laptopRouter);
app.use(headphoneRouter);
app.use(accessoriesRouter);
app.use(transactionRouter);
app.use(adminRouter);
app.use(imageRouter);

// connect to db
require("./db/mongoose");

module.exports = app;
