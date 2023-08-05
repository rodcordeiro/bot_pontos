import path from "path";
import fs from "fs";
import { BaseCommand } from "../helpers/base/command";
import { Commands } from "../core/commands";

const commandPath = path.join(__dirname, "./");
const commandDirs = fs.readdirSync(commandPath);
class CommandHandler extends Commands {
  async execute() {
    for (const dir of commandDirs) {
      const filePath = path.join(commandPath, dir, `${dir}.command`);
      if (!fs.existsSync(filePath)) {
        console.error(`[WARNING] The  ${dir} has no command file`);
        return;
      }
      console.log({ filePath });
      try {
        const command: BaseCommand = await import(filePath).then(
          (module) => new module.default()
        );
        this.set(command.name, command);
      } catch (err) {
        console.error(`[WARNING] The  ${dir} failed to be imported`);
        console.debug(err);
      }
    }
  }
}
export { CommandHandler };
