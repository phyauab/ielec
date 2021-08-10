const mongoose = require("mongoose");

// mongodb://127.0.0.1:27017/ielec
mongoose.connect("mongodb://127.0.0.1:27017/ielec", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
