const mongoose = require("mongoose");

// mongodb://127.0.0.1:27017/ielec
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
