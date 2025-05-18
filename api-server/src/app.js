import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRoutes from "./routes/statsRoutes.js";
import "./nats/subscriber.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", statsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
