import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { DogService } from '../../services/dog.service';
import { IContext } from '../context/context.interface';

export class DogCommand extends Command {
  constructor(bot: Telegraf<IContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('dog', async (ctx: IContext) => {
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
