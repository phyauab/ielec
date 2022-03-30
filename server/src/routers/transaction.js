const express = require("express");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const auth = require("../middleware/auth");
const { Transaction } = require("../models/transaction");
const { CartItem } = require("../models/cartItem");
const { Product } = require("../models/product/product");
// const {  } = require("../models/cartItem");

// POST: STRIPE
router.post("/transactions/create-payment-intent", auth, async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  // 400 = 4.00 hkd
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "hkd",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// POST: create transaction
router.post("/transactions", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({
      user: req.user._id,
      isPaid: false,
    }).populate("product");

    if (cartItems.length === 0) {
      throw new Error("Cart Items is empty");
    }

    // update product qty and sales
    for (const cartItem of cartItems) {
      let product = await Product.findById(cartItem.product._id);
      product.sales++;
      product.qty--;
      await product.save();
    }

    let cartItemIds = [];
    let amount = 0;

    for (const cartItem of cartItems) {
      cartItemIds.push(cartItem._id);
      cartItem.isPaid = true;
      await cartItem.save();
      amount += cartItem.price * cartItem.qty;
    }

    const transaction = new Transaction({
      cartItems: cartItemIds,
      user: req.user.id,
      amount: amount,
    });

    await transaction.save();
    res.send(transaction);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET: transactions
router.get("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    res.send(transactions);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET: transactions
router.get("/transactions/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate({
      path: "cartItems",
      model: "CartItem",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "brand",
          model: "Brand",
        },
      },
    });

    res.send(transaction);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete: transactions
router.delete("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.deleteMany({ user: req.user._id });
    res.send(transactions);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
