import { Telegraf, Context } from 'telegraf';
import { Command } from './command.class';
import { CatService } from '../../services/cat.service';

export class CatCommand extends Command {
  constructor(bot: Telegraf<Context>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('cat', async (ctx: Context) => {
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
