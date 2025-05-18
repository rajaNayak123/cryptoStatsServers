const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const statsRoutes = require("./routes/statsRoutes.js");
require("./nats/subscriber.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", statsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
