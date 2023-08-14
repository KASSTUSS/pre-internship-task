import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IContext } from '../context/context.interface';

export class PlacesCommand extends Command {
  constructor(bot: Telegraf<IContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('places', (ctx: IContext) => {
      ctx.scene.enter('PLACES_SCENE');
    });
  }
}
