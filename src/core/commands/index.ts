export class Commands {
//   private static instance: Commands | null = null;
//   private constructor() {}
  commandsList: Array<{ name: string; command: any }> = [];
  set(name: string, command: any) {
    this.commandsList.push({ name, command });
  }
  get(name: string) {
    const command = this.commandsList.find((cmd) => cmd.name === name);
    return command?.command;
  }
//   static start(): Commands {
//     if (this.instance) {
//       return this.instance;
//     }
//     this.instance = new Commands();
//     return this.instance;
//   }
}
// export const commandsHandler = Commands.start();
