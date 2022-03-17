const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Authentication failed");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findOne(
      {
        _id: decoded._id,
      },
      "isAdmin username email"
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
