import { Message, MessageMedia } from "whatsapp-web.js";
import { BaseCommand, IBaseCommand } from "../../helpers/base/command";
import { api } from "../../core/api";
import { API } from "../../helpers/interfaces";
import { Templates } from "../../helpers/templates";
import { Handler } from "../../utils/handler";

class Linhas extends BaseCommand implements IBaseCommand {
  constructor() {
    super({
      name: "linhas",
      description: "Lista as linhas",
    });
  }
  async execute(message: Message) {
    const chat = await message!.getChat();
    chat.sendStateTyping();

    const { data } = await api.get<API.APIResponse>("/");

    const content = `*Lista de linhas:*\n${data.linhas
      .map(({ id, linha }) => Templates.MENU(id, linha))
      .join("\n")}`;
    await message?.reply(content);

    return;
  }
}

export default new Linhas();
