import Commands from "../commands";
import { client } from "../core/client";

client.on("message", (message) => {
  if (message.fromMe) return;
  console.log(message.body);
  console.log(Commands.commandsList);
  // const commands = new CommandHandler();
  // commands.execute();
  // console.log(commands.commandsList);
});
