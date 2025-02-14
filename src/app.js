const express = require("express");
const serverless = require("serverless-http");
const readAppsRoutes = require("./routes/readApps"); 

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Lambda!" });
});


app.use("/read-apps", readAppsRoutes);

module.exports.handler = serverless(app);
