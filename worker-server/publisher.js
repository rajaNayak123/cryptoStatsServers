import { publish } from "../shared/nats";
const triggerUpdate = async () => {
  await publish("crypto.update", { trigger: "update" });
};
export { triggerUpdate };
