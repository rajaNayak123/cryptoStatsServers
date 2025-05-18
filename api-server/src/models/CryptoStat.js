import mongoose from "mongoose";
const cryptoStatSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now },
});
const CryptoStat = mongoose.model("CryptoStat", cryptoStatSchema);

export { CryptoStat };
