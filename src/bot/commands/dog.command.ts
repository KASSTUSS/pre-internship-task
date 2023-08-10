import { Telegraf, Context } from 'telegraf';
import { Command } from './command.class';
import { DogService } from '../../services/dog.service';

export class DogCommand extends Command {
  constructor(bot: Telegraf<Context>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('dog', async (ctx: Context) => {
      try {
        const dogImageUrl = await new DogService().getRandomDogImage();
        await ctx.replyWithPhoto(dogImageUrl);
      } catch (error) {
        console.error('Error fetching dog image:', error);
        await ctx.reply(
          "Sorry, I couldn't fetch a dog image at the moment. Please try again later.",
        );
      }
    });
  }
}
