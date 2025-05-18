require('dotenv').config();
const cron = require('node-cron');
const triggerUpdate = require('./publisher');
cron.schedule('*/15 * * * *', () => {
  console.log('Triggering update event');
  triggerUpdate();
});
