import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IContext } from '../context/context.interface';

export class WeatherCommand extends Command {
  constructor(bot: Telegraf<IContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('weather', (ctx: IContext) => {
      ctx.scene.enter('WEATHER_SCENE');
    });
  }
}
