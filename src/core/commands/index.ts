export class Commands {
  commandsList: Array<{ name: string; command: any }> = [];
  set(name: string, command: any) {
    this.commandsList.push({ name, command });
  }
  get(name: string) {
    const command = this.commandsList.find((cmd) => cmd.name === name);
    return command?.command;
  } 
}
