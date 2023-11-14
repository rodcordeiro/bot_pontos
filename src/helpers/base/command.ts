import WAWebJS from "whatsapp-web.js";

export type IBaseCommand = {
  execute(message: WAWebJS.Message): Promise<void>;
  execute(message: WAWebJS.Message, ...args: any[]): Promise<void>;
};
export class BaseCommand {
  public name: string;
  public description: string;
  public help?: string;
  constructor(payload: { name: string; description: string; help?: string }) {
    this.name = payload.name;
    this.description = payload.description;
    this.help = payload.help;
  }
}
