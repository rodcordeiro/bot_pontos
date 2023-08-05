import { Message } from "whatsapp-web.js";
import { BaseCommand, IBaseCommand } from "../../helpers/base/command";

class Pontos extends BaseCommand implements IBaseCommand {
  constructor() {
    super({ name: "string", description: "string", help: "string" });
  }
  async execute(message?: Message | undefined, ...args: any[]) {}
}

export default Pontos;
