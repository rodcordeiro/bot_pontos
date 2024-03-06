import { Events } from 'whatsapp-web.js';
import { client } from '../core/client';
import { sendQrCode } from '../utils/disc';

client.on(Events.QR_RECEIVED, async (qr: string) => {
  await sendQrCode(qr);
});

client.on(Events.READY, async () => {
  console.log('Client is ready!');
  await import('../cron');
  // await import('../commands');
});

client.on(Events.DISCONNECTED, async (reason: string) => {
  console.log('Client::Disconnected', reason);
  client.initialize();
});
