import { Message } from "whatsapp-web.js";
import Commands from "../index";
import { BaseCommand, IBaseCommand } from "../../helpers/base/command";

class Help extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: "pontos",
      description: "Lista os pontos de determinada linha",
      help: "Comando para listagem de pontos!\nPara utilizar este comando, você precisa mandar\n```/pontos numero_da_linha```\nPor exemplo, para visualizar os pontos de Logun Edé, envie: /pontos 4, agora, para os pontos de Pretos velhos, é: /pontos 27.\n\n```Para ver os números de todas as linhas, envie /linhas```",
    });
  }
  async execute(message: Message, ...args: any[]) {
    const chat = await message!.getChat();
    chat.sendStateTyping();
    const content = Commands.commandsList
      .filter((command) => command.command.help !== undefined)
      .map((command) => `*/${command.name}:* ${command.command.help}`)
      .join("\n");
    await message.reply(
      `Aqui estão os comandos que atendo hoje:\n${content}\n Para ver Mais informações sobre algum comando, basta executar o comando enviando \`\`\`help\`\`\` junto. Exemplo: /pontos help.`
    );
  }
}

export default new Help();
