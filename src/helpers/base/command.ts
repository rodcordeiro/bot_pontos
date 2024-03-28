import type WAWebJS from 'whatsapp-web.js';

export interface IBaseCommand {
  execute: ((_message: WAWebJS.Message) => Promise<void>) &
    ((_message: WAWebJS.Message, ..._args: unknown[]) => Promise<void>);
}
export abstract class BaseCommand implements IBaseCommand {
  public name: string;
  public description: string;
  public help?: string;
  constructor(payload: { name: string; description: string; help?: string }) {
    this.name = payload.name;
    this.description = payload.description;
    this.help = payload.help;
  }

  async execute(_message?: WAWebJS.Message, ..._args: unknown[]) {}
}
