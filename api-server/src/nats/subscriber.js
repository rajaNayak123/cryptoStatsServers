import nats from "../../../shared/nats.js";
import { storeCryptoStats } from "../services/coingeckoService.js";
nats.subscribe("crypto.update", async (msg) => {
  console.log("Received:", msg);
  await storeCryptoStats();
});
