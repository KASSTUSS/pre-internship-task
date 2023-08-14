import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { CatService } from '../../services/cat.service';
import { IContext } from '../context/context.interface';

export class CatCommand extends Command {
  constructor(bot: Telegraf<IContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('cat', async (ctx: IContext) => {
      try {
        const catImageUrl = await new CatService().getRandomCatImage();
        await ctx.replyWithPhoto(catImageUrl);
      } catch (error) {
        console.error('Error fetching cat image:', error);
        await ctx.reply(
          "Sorry, I couldn't fetch a cat image at the moment. Please try again later.",
        );
      }
    });
  }
}
