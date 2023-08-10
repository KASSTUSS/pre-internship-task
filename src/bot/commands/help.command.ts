import { Markup, Telegraf, Context } from 'telegraf';
import { Command } from './command.class';

export class HelpCommand extends Command {
  constructor(bot: Telegraf<Context>) {
    super(bot);
  }

  handle(): void {
    this.bot.help(ctx => {
      ctx.reply(
        `Привет! Я очень полезный бот, благодаря мне ты можешь:
 /cat - получить фото котика;
 /dog - получить фото собачки;
 /places - узнать об интересных местах в любом городе;
 /weather_subcribtion - подписаться на уведомления о погоде в любом городе;
 /task_manager - управление своими задачами и напоминаниями`,
        Markup.keyboard([
          ['/cat', '/dog'],
          ['/places', '/weather_subcribtion', '/task_manager'],
        ])
          .oneTime()
          .resize(),
      );
    });
  }
}
