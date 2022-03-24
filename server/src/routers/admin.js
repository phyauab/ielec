const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");
const { Product } = require("../models/product/product");
const { CartItem } = require("../models/cartItem");

// GET: DASHBOARD
router.get("/admin/dashboard", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("No acceess");
    }

    let dashboard = {};
    const today = new Date();

    // User
    const numOfUsers = await User.countDocuments();
    const numOfNewUsers = await User.countDocuments({
      createdAt: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
        // $gte: new Date(2022, 3, 20),
        // $lt: new Date(2023, 10, 10),
      },
    });
    let user = {};
    user.numOfUsers = numOfUsers;
    user.numOfNewUsers = numOfNewUsers;
    dashboard.user = user;

    // Orders / Transactions
    const numOfOrders = await Transaction.countDocuments();
    const numOfNewOrders = await Transaction.countDocuments({
      createdAt: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
        // $gte: new Date(2022, 3, 20),
        // $lt: new Date(2023, 10, 10),
      },
    });
    let order = {};
    order.numOfOrders = numOfOrders;
    order.numOfNewOrders = numOfNewOrders;
    dashboard.order = order;

    // Total sales
    const totalSales = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" },
        },
      },
    ]);
    const todaySales = await Transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ),
            $lt: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" },
        },
      },
    ]);
    let sales = {};
    sales.totalSales = totalSales.length > 0 ? totalSales[0].amount : 0;
    sales.todaySales = todaySales.length > 0 ? todaySales[0].amount : 0;
    dashboard.sales = sales;

    // top products
    const topProducts = await Product.find().sort({ sales: "desc" }).limit(5);
    dashboard.topProducts = topProducts;

    // top categories
    // const topCategories = await Product.find().select("__t").distinct("__t");
    const topCategories = await Product.find().select("__t").distinct("__t");
    for (const category of topCategories) {
      const a = await CartItem.aggregate([
        // {
        //   // $match: {
        //   //   __t: category,
        //   //   // isPaid: true,
        //   // },
        // },
        // {
        //   $group: {
        //     _id: null,
        //     price: { $sum: "$price" },
        //   },
        // },
        {
          $lookup: {
            from: "products",
            let: { t: "$__t" },
            pipeline: [
              {
                $match: {
                  __t: category,
                },
              },
              {
                $group: {
                  _id: null,
                  price: { $sum: "$price" },
                },
              },
            ],
            as: "products",
          },
        },
      ]);
      console.log(a);
    }
    dashboard.topCategories = topCategories;

    res.send(dashboard);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// GET: USERS
router.get("/admin/users", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const users = await User.find();
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.post("/admin/users", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }

    const isExist = await User.findOne({ username: req.body.username });
    if (isExist) {
      throw new Error("User already exists");
      // throw "User existed already";
    }

    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

// GET: PRODUCTS
router.get("/admin/products", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const products = await Product.find().populate("brand");
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

// GET: TRANSACTIONS
router.get("/admin/transactions", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

module.exports = router;
