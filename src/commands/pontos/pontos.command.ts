import { Message, MessageMedia } from "whatsapp-web.js";
import { BaseCommand, IBaseCommand } from "../../helpers/base/command";
import { Templates } from "../../helpers/templates";
import { Handler } from "../../utils/handler";
import { api } from "../../core/api";
import { API } from "../../helpers/interfaces";

class Pontos extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: "pontos",
      description: "Lista os pontos de determinada linha",
      help: "Comando para listagem de pontos!\nPara utilizar este comando, você precisa mandar\n```/pontos numero_da_linha```\nPor exemplo, para visualizar os pontos de Logun Edé, envie: /pontos 4, agora, para os pontos de Pretos velhos, é: /pontos 27.\n\n```Para ver os números de todas as linhas, envie /linhas```",
    });
  }
  async execute(message: Message | undefined, ...args: any[]) {
    const chat = await message!.getChat();
    chat.sendStateTyping();
    if (args.includes("help")) {
      await message!.reply(this.help || this.description);
      return;
    }
    let linha = args[0];
    const regex = new RegExp(/(\/pontos)(\S\d{0,2})/gim);
    if (regex.test(message!.body)) {
      const data = regex.exec(message!.body);
      console.debug("pontosCommand::regexdata", data);
      linha = data![2];
    }
    const { data } = await api.get<API.APIResponse>("/");
    const handler = new Handler(data.pontos);
    const pontos = handler.filterBy(linha, "line_id");
    const content = `*Pontos de ${pontos[0].line_description}*\n${pontos
      .map(Templates.PONTO)
      .join("-------------------------------\n")}\n${Templates.Footer(
      pontos[0].line_description
    )}`;
    const sentMessage = await message?.reply(content);
    if (pontos.some((ponto) => ponto.audio_link)) {
      pontos
        .filter((ponto) => ponto.audio_link)
        .map(async (ponto) => {
          const audio = await MessageMedia.fromUrl(String(ponto.audio_link));
          await sentMessage?.reply("", undefined, {
            media: audio,
          });
        });
    }
    return;
  }
}

export default new Pontos();
