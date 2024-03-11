import { Message } from 'whatsapp-web.js';
import Commands from '../index';
import { BaseCommand, IBaseCommand } from '../../helpers/base/command';

class Help extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: 'Help',
      description: 'Exibe a mensagem de ajuda dos comandos',
    });
  }
  async execute(message: Message, ..._args: any[]) {
    const chat = await message!.getChat();
    chat.sendStateTyping();
    const content = Commands.commandsList
      .filter((command) => command.command.help !== undefined)
      .map((command) => `*/${command.name}:* ${command.command.help}`)
      .join('\n');
    await message.reply(
      `Aqui estão os comandos que atendo hoje:\n${content}\n Para ver Mais informações sobre algum comando, basta executar o comando enviando \`\`\`help\`\`\` junto. Exemplo: /pontos help.`,
    );
  }
}

export default new Help();
