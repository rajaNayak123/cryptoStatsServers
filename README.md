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

### GET /deviation?coin=bitcoin

Returns the standard deviation of the last 100 price records.
Query Params:

   - `coin`: one of `bitcoin`, `ethereum`, `matic-network`

#### Sample Response:
 ``` json
{
  "deviation": 4082.48
}
```

## ⏲ Background Job

  - Runs every 15 minutes in `worker-server`

  - Publishes event: `{ "trigger": "update" }` to NATS

  - `api-server` listens for this event and triggers `storeCryptoStats()` to fetch and store data


## 🛠️ Tech Stack

  - Node.js + Express

  - MongoDB + Mongoose

  - NATS (as the event queue)

  - Axios (for CoinGecko API)

  - node-cron (for scheduling)

## 🧩 Setup Instructions
### 1. Clone the repository

``` bash 
git clone https://github.com/yourusername/crypto-stats-service.git
cd crypto-stats-service
```
### 2. Install dependencies

``` bash
cd api-server && npm install
cd ../worker-server && npm install
```
### 3. Configure .env files
In `api-server/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/crypto-stats
NATS_URL=nats://localhost:4222
```
In `worker-server/.env`:

``` bash
NATS_URL=nats://localhost:4222
```

### 4. Start NATS Server (if not already running)

``` bash
nats-server
```
  Or using Docker:

``` bash
docker run -p 4222:4222 nats
```

### 5. Start the servers

In separate terminals:

```bash
# API Server
cd api-server
npm start

# Worker Server
cd ../worker-server
npm start
```
## 📊 MongoDB Schema
 ``` json
{
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now }
}

```
