// subscriber.js
const nats = require("../../../shared/nats.js");
const { storeCryptoStats } = require("../services/coingeckoService.js");

const startSubscription = () => {
  nats.subscribe("crypto.update", async (msg) => {
    console.log("Received:", msg);
    await storeCryptoStats();
  });
};

module.exports = { startSubscription };

