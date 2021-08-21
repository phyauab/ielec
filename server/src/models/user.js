const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// has the password if modified before every save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      throw new Error("Error");
    }
  }

  next();
});

// Q: Why not just password?
// A: same password for >1 user
userSchema.statics.findByPassword = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("username does not exist!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong Password!");
  }

  return user;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
