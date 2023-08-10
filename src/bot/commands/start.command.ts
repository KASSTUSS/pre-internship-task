import { Markup, Telegraf, Context } from 'telegraf';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(bot: Telegraf<Context>) {
    super(bot);
  }

  handle(): void {
    this.bot.start(ctx => {
      ctx.reply(
        `Привет! Я очень полезный бот, благодаря мне ты можешь:
 • получить фото котика;
 • получить фото собачки;
 • узнать об интересных местах в любом городе;
 • подписаться на уведомления о погоде в любом городе;
 • управлять своими задачами и напоминаниями
 Чтобы узнать больше введите /help`,
        Markup.keyboard(['/help']).oneTime().resize(),
      );
    });
  }
}
