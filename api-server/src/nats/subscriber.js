const nats = require('../../shared/nats');
const { storeCryptoStats } = require('../services/coingeckoService');
nats.subscribe('crypto.update', async (msg) => {
  console.log('Received:', msg);
  await storeCryptoStats();
});