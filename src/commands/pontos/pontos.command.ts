import { Message, MessageMedia } from 'whatsapp-web.js';
import { BaseCommand, IBaseCommand } from '../../helpers/base/command';
import { Templates } from '../../helpers/templates';
import { api } from '../../core/api';
import { API } from '../../helpers/interfaces';

class Pontos extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: 'pontos',
      description: 'Lista os pontos de determinada linha',
      help: 'Comando para listagem de pontos!\nPara utilizar este comando, você precisa mandar\n```/pontos numero_da_linha```\nPor exemplo, para visualizar os pontos de Logun Edé, envie: /pontos 4, agora, para os pontos de Pretos velhos, é: /pontos 27.\n\n```Para ver os números de todas as linhas, envie /linhas```',
    });
  }
  async execute(message: Message | undefined, ...args: any[]) {
    try {
      const chat = await message!.getChat();
      chat.sendStateTyping();
      if (args.includes('help')) {
        await message!.reply(this.help || this.description);
        return;
      }

      let linha = args[0].toString();
      console.log({ linha });
      const { data } = await api.get<API.Ponto[]>(
        `/pontos/list.php?line=${linha}`,
      );

      const content = `*Pontos de ${data[0].line_description}*\n${data
        .map(Templates.PONTO)
        .join('-------------------------------\n')}\n${Templates.Footer(
        data[0].line_description,
      )}`;
      const sentMessage = await message?.reply(content);
      if (data.some((ponto) => ponto.audio_link)) {
        data
          .filter((ponto) => ponto.audio_link)
          .map(async (ponto) => {
            const audio = await MessageMedia.fromUrl(
              `https://raizes.rodrigocordeiro.com.br/pontos/${ponto.audio_link}`,
            );
            await sentMessage?.reply('', undefined, {
              media: audio,
            });
          });
      }
      return;
    } catch (e) {
      console.error(e);
      await message!.reply('Não foi possível executar o commando!');
      await message!.reply(this.help || this.description);
    }
  }
}

export default new Pontos();
