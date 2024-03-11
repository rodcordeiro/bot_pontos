import { Client, LocalAuth } from 'whatsapp-web.js';
export const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer:
    process.env.NODE_ENV === 'prod'
      ? {
          headless: true,
          args: ['--no-sandbox'],
        }
      : {},
});
