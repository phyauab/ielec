const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Authentication failed");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne(
      {
        _id: decoded._id,
      },
      "username email isAdmin firstName lastName gender email birthday"
    );
    if (!user) {
      throw new Error("Authentication failed");
    }
    req.user = user;
    // req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = auth;
