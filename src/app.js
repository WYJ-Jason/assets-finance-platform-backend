const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Lambda!" });
});

app.get("/user", (req, res) => {
  res.json({ message: "User - Hello from Express on Lambda!" });
});

module.exports.handler = serverless(app);
