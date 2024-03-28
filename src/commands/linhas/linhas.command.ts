import { type Message } from 'whatsapp-web.js';
import { BaseCommand, type IBaseCommand } from '../../helpers/base/command';
import { api } from '../../core/api';
import { type API } from '../../helpers/interfaces';
import { Templates } from '../../helpers/templates';

class Linhas extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: 'linhas',
      description: 'Lista as linhas',
      help: 'Lista as linhas',
    });
  }

  async execute(message: Message) {
    const chat = await message.getChat();
    chat.sendStateTyping();

    const { data } = await api.get<API.APIResponse>('/');

    const content = `*Lista de linhas:*\n${data.linhas
      .map(({ id, linha }) => Templates.MENU(id, linha))
      .join('\n')}`;
    await message?.reply(content);
  }
}

export default new Linhas();
