import { Telegraf, session, Context } from 'telegraf';
import {
  Command,
  StartCommand,
  HelpCommand,
  CatCommand,
  DogCommand,
} from './commands';
import { IBotConfig } from '../config/bot.config';

export class Bot {
  private bot: Telegraf<Context>;
  private commands: Command[] = [];

  constructor(private readonly BotConfig: IBotConfig) {
    this.bot = new Telegraf<Context>(this.BotConfig.BOT_TOKEN);
    this.bot.use(session());
  }

  /**
   * Initialize and start telegram bot.
   */
  start() {
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new CatCommand(this.bot),
      new DogCommand(this.bot),
    ];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
