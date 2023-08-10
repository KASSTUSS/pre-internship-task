import { Markup, Telegraf, Context } from "telegraf";
import { Command } from "./command.class";
import axios from 'axios';

export class DogCommand extends Command {
  constructor(bot: Telegraf<Context>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('dog', async (ctx) => {
      await ctx.replyWithPhoto(await getCatPhoto(), 
        Markup.keyboard([
          ['/cat', '/dog'],
          ['/places', '/weather_subcribtion', '/task_manager'],
        ])
        .oneTime()
        .resize())
      });
  }
}

async function getCatPhoto(): Promise<string> {
  const responce: string = ((await axios.get('https://api.thedogapi.com/v1/images/search')).data[0].url);
  return responce;
}
