const express = require("express");
const serverless = require("serverless-http");
const readAppsRoutes = require("./routes/readApps");
const createAppsRoutes = require("./routes/createApps");
const deleteAppsRoutes = require("./routes/deleteApps");
const updateAppsRoutes = require("./routes/updateApps");
const connectDB = require("./db/mongoConnection");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Lambda!" });
});

app.use("/read-apps", readAppsRoutes);
app.use("/create-apps", createAppsRoutes);
app.use("/delete-apps", deleteAppsRoutes);
app.use("/update-apps", updateAppsRoutes);

module.exports.handler = serverless(app);
