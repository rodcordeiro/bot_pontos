import { Message, MessageMedia } from "whatsapp-web.js";
import { BaseCommand, IBaseCommand } from "../../helpers/base/command";
import { Templates } from "../../helpers/templates";
import { Handler } from "../../utils/handler";
import { api } from "../../core/api";
import { API } from "../../helpers/interfaces";
import { Logger } from "../../core/logger";

class Pontos extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: "pontos",
      description: "Lista os pontos de determinada linha",
      help: "Comando para listagem de pontos!\nPara utilizar este comando, você precisa mandar\n```/pontos numero_da_linha```\nPor exemplo, para visualizar os pontos de Logun Edé, envie: /pontos 4, agora, para os pontos de Pretos velhos, é: /pontos 27.\n\n```Para ver os números de todas as linhas, envie /linhas```",
    });
  }
  async execute(message: Message, ...args: any[]) {
    try {
      const chat = await message!.getChat();
      chat.sendStateTyping();
      if (args.includes("help")) {
        await message!.reply(this.help || this.description);
        return;
      }
      let linha = args[0];
      const regex = new RegExp(/(\/pontos\s)(\d{0,2})/gim),
        validateBody = regex.test(message.body);

      // console.log({
      //   linha,
      //   regex,
      //   teste: validateBody,
      //   body: message!.body,
      //   args,
      // });

      if (!validateBody) {
        await message?.reply(
          "Por favor, informe uma linha para prosseguir. Utilize o comando /linhas para ver todas as linhas disponíveis"
        );
        return;
      }
      linha = message!.body.split(" ")[1];

      if (!linha) {
        await message?.reply(
          "Por favor, informe uma linha para prosseguir. Utilize o comando /linhas para ver todas as linhas disponíveis"
        );
        return;
      }
      const { data } = await api.get<API.APIResponse>("/");
      const handler = new Handler(data.pontos);
      const pontos = handler.filterBy(linha, "line_id");
      for await (const ponto of pontos) {
        try {
          if (!!ponto.audio_link) {
            const msg = await message.reply(Templates.PONTO(ponto));
            Logger.info(
              `https://raizes.rodrigocordeiro.com.br/pontos/${ponto.audio_link}`
            );
            const audio = await MessageMedia.fromUrl(
              `https://raizes.rodrigocordeiro.com.br/pontos/${ponto.audio_link}`,
              {
                unsafeMime: true,
              }
            );
            await msg.reply("AUDIO", undefined, {
              media: audio,
            });
          } else {
            await message.reply(Templates.PONTO(ponto));
          }
        } catch (e) {
          Logger.error(e);
        }
      }
      // pontos.map(async (ponto) => {});
      // const content = `*Pontos de ${pontos[0].line_description}*\n${pontos
      //   .map(Templates.PONTO)
      //   .join("-------------------------------\n")}\n${Templates.Footer(
      //   pontos[0].line_description
      // )}`;
      // const sentMessage = await message?.reply(content);
      // if (pontos.some((ponto) => ponto.audio_link)) {
      //   pontos
      //     .filter((ponto) => ponto.audio_link)
      //     .map(async (ponto) => {
      //       console.log(ponto.audio_link);
      //       const audio = await MessageMedia.fromUrl(
      //         `https://raizes.rodrigocordeiro.com.br/pontos/${ponto.audio_link}`
      //       );

      //       if (audio.filesize) {
      //         await sentMessage?.reply("", undefined, {
      //           media: audio,
      //         });
      //       }
      //     });
      // }
      // return;
    } catch (e) {
      Logger.error(e);
      await message.reply(
        "Ops, não consegui executar o comando. Tente novamente, por favor."
      );
    }
  }
}

export default new Pontos();
