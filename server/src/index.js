const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Routers
app.use("/", (req, res) => {
  res.send("IELEC");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
