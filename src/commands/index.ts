import Pontos from './pontos/pontos.command';
import Help from './help/help.command';

import { Commands } from '../core/commands';

const commands = new Commands();

[Help, Pontos].map((cmd) => commands.set(cmd.name, cmd));
export default commands;
