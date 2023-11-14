import Commands from "../commands";
import { Logger } from "../core/logger";
import { client } from "../core/client";

client.on("message", (message) => {
  if (message.fromMe) return;
  Logger.debug(message.description, message.type, message.body, message.from);

  if (message.body.startsWith("/")) {
    const commandName = message.body.slice(1).trim().split(" ").shift();
    Logger.debug(`Executing: ${commandName}`);
    const command = Commands.get(commandName!.toLowerCase());
    try {
      command.execute(message);
    } catch (err) {
      Logger.error({ ...(err as Error), commandName });
      message.reply("Comando não encontrado ou não existe!");
    }
  }
});
