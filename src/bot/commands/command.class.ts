import { Telegraf } from 'telegraf';
import { IContext } from '../context/context.interface';

export abstract class Command {
  constructor(public bot: Telegraf<IContext>) {}

  abstract handle(): void;
}
