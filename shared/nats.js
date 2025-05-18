const { connect, StringCodec } = require('nats');
const sc = StringCodec();
let nc;
(async () => { nc = await connect({ servers: process.env.NATS_URL }); })();
module.exports = {
  publish: async (subject, msg) => { await nc.publish(subject, sc.encode(JSON.stringify(msg))); },
  subscribe: async (subject, callback) => {
    const sub = nc.subscribe(subject);
    for await (const m of sub) callback(JSON.parse(sc.decode(m.data)));
  }
};