import { BaseCommand } from '../../helpers/base/command';

export class Commands {
  commandsList: Array<{ name: string; command: BaseCommand }> = [];
  set(name: string, command: BaseCommand) {
    this.commandsList.push({ name, command });
  }
  get(name: string) {
    const command = this.commandsList.find((cmd) => cmd.name === name);
    return command?.command;
  }
}
