import axios from "axios";
import {CryptoStat} from "../models/CryptoStat.js";

export const storeCryptoStats = async () => {
  const url = "https://api.coingecko.com/api/v3/simple/price";
  const coins = ["bitcoin", "ethereum", "matic-network"];
  const params = {
    ids: coins.join(","),
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_change: "true",
  };

  const { data } = await axios.get(url, { params });

  for (const coin of coins) {
    const stat = new CryptoStat({
      coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    });
    await stat.save();
  }
};
