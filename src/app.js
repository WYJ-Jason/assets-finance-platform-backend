const express = require("express");
const serverless = require("serverless-http");
const userRoutes = require("./routes/user"); // 引入用户路由

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Lambda!" });
});

// 使用用户路由
app.use("/user", userRoutes);

module.exports.handler = serverless(app);
