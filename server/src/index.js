const express = require("express");
const app = express();
const PORT = process.env.PORT;
var cors = require("cors");
const userRouter = require("./routers/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
