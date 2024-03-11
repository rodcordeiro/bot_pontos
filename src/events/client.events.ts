import { Events } from "whatsapp-web.js";
import { client } from "../core/client";
import { Logger } from "../core/logger";
import { sendQrCode } from "../utils/disc";

client.on(Events.QR_RECEIVED, async (qr: string) => {
  await sendQrCode(qr);
});

client.on(Events.READY, async () => {
  Logger.info("Client is ready!");

  await import("../cron");
  // await import("../commands");
});

client.on(Events.DISCONNECTED, async (reason: string) => {
  Logger.error("Client::Disconnected", reason);
  client.initialize();
});
