import { Events } from 'whatsapp-web.js';
import Commands from '../commands';
import { client } from '../core/client';

client.on(Events.MESSAGE_RECEIVED, (message) => {
  if (message.fromMe) return;
  if (!message.body.startsWith('/')) return;
  const content = message.body.split(' ');

  const command = content[0].slice(1);
  const cmd = Commands.commandsList.find(
    (cmd) => cmd.name.toLowerCase() === command.toLowerCase(),
  );
  if (cmd) {
    const args = content.slice(1);
    cmd.command.execute(message, args);
  }
});
