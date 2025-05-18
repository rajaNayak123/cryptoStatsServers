// nats.js
const { connect, StringCodec } = require("nats");

const sc = StringCodec();
let nc;

const init = async () => {
  if (!nc) {
    nc = await connect({ servers: process.env.NATS_URL || "nats://localhost:4222" });
    console.log("NATS connected");
  }
};

const publish = async (subject, msg) => {
  if (!nc) throw new Error("NATS connection not initialized. Call init() first.");
  await nc.publish(subject, sc.encode(JSON.stringify(msg)));
};

const subscribe = async (subject, callback) => {
  if (!nc) throw new Error("NATS connection not initialized. Call init() first.");
  const sub = nc.subscribe(subject);
  (async () => {
    for await (const m of sub) {
      callback(JSON.parse(sc.decode(m.data)));
    }
  })();
};

module.exports = {
  init,
  publish,
  subscribe,
};
