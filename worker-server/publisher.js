const { publish } = require('../shared/nats');
const triggerUpdate = async () => {
  await publish('crypto.update', { trigger: 'update' });
};
module.exports = triggerUpdate;