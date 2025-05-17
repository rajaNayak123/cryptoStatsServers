# 🪙 Crypto Stats Microservices App

This project consists of **two Node.js servers** that communicate via **NATS** to collect and expose cryptocurrency statistics in real-time. Data is fetched from the **CoinGecko API** and stored in **MongoDB**.

---

## 📁 Project Structure

├── api-server/ Handles API endpoints and data storage

├── worker-server/  Background job publisher

├── shared/  Shared logic for NATS connection

└── README.md


---

## 🧠 Features

### ✅ `api-server`
- REST APIs to expose crypto stats
- Stores data in MongoDB
- Subscribes to NATS for real-time updates

### ✅ `worker-server`
- Publishes an event every 15 minutes to NATS
- Triggers `storeCryptoStats()` in api-server via pub-sub

---

## 🚀 APIs

### `GET /stats?coin=bitcoin`

Returns the **latest data** for the given coin.

#### Query Params:
- `coin`: one of `bitcoin`, `ethereum`, `matic-network`

#### Sample Response:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

GET /deviation?coin=bitcoin

Returns the standard deviation of the last 100 price records.
Query Params:

    coin: one of bitcoin, ethereum, matic-network

Sample Response:
{
  "deviation": 4082.48
}


⏲ Background Job

  Runs every 15 minutes in worker-server

  Publishes event: { "trigger": "update" } to NATS

  api-server listens for this event and triggers storeCryptoStats() to fetch and store data



