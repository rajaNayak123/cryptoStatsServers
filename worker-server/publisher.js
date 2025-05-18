const { publish } = require("../shared/nats.js");

const triggerUpdate = async () => {
  await publish("crypto.update", { trigger: "update" });
};

module.exports = { triggerUpdate };
