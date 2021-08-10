const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");

const userOne = {
  username: "userOne",
  email: "userOne@gmail.com",
  password: "1pjri3ow490r",
};

const setupDatabase = async () => {
  await User.deleteMany({});
};

module.exports = {
  userOne,
  setupDatabase,
};
