const dotenv = require("dotenv");
const cron = require("node-cron");
const triggerUpdate = require("./publisher.js");

dotenv.config();

cron.schedule("*/15 * * * *", () => {
  console.log("Triggering update event");
  triggerUpdate();
});
