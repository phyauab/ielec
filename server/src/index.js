const express = require("express");
const app = express();
const PORT = process.env.PORT;
const userRouter = require("./routers/user");

// Routers
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
