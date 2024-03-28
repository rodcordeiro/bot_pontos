import { MessageMedia } from 'whatsapp-web.js';
import { schedule } from 'node-cron';
import { api } from '../core/api';
import { client } from '../core/client';
import { type API } from '../helpers/interfaces';
import { Handler } from '../utils/handler';
import { Templates } from '../helpers/templates';

const DAILY_CRON = '0 9 * * *';

const SendDailyMusic = async () => {
  try {
    const { data } = await api.get<API.APIResponse>('/');
    const handler = new Handler(data.pontos);
    const selected = handler.getRandom();
    const content = Templates.DAILY(selected);
    const destiny = process.env.RAIZES_ID;
    const message = await client.sendMessage(destiny, content);
    if (selected.audio_link) {
      const audio = await MessageMedia.fromUrl(
        `https://raizes.rodrigocordeiro.com.br/pontos/${selected.audio_link}`,
      );
      await message.reply('', undefined, {
        media: audio,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

schedule(DAILY_CRON, SendDailyMusic, {
  name: 'daily',
  runOnInit: process.env.NODE_ENV === 'dev',
  timezone: 'America/Sao_Paulo',
  scheduled: true,
});
