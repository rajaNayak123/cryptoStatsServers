const { CryptoStat } = require("../models/CryptoStat.js");
const { stdDev } = require("../utils/stdDev.js");

const getLatestStats = async (req, res) => {
  const { coin } = req.query;
  const data = await CryptoStat.findOne({ coin }).sort({ timestamp: -1 });
  if (!data) return res.status(404).send({ error: "Data not found" });
  res.send({
    price: data.price,
    marketCap: data.marketCap,
    "24hChange": data.change24h,
  });
};

const getDeviation = async (req, res) => {
  const { coin } = req.query;
  const records = await CryptoStat.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);
  const prices = records.map((r) => r.price);
  const deviation = stdDev(prices);
  res.send({ deviation: +deviation.toFixed(2) });
};

module.exports = { getLatestStats, getDeviation };
