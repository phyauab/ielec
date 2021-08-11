const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // console.log(req);
    // console.log("auth");
    const token = req.header("Authorization").replace("Bearer ", "");
    //console.log("1");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decoded: " + JSON.stringify(decoded));
    // console.log("token: " + JSON.stringify(token));
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    // console.log("user: " + JSON.stringify(user));
    if (!user) {
      throw new Error("Authentication failed");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = auth;
