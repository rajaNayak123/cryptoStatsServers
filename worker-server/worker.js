import dotenv from "dotenv";
import cron from "node-cron";
import triggerUpdate from "./publisher.js";

dotenv.config();

cron.schedule("*/15 * * * *", () => {
  console.log("Triggering update event");
  triggerUpdate();
});
