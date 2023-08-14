import { Telegraf, session, Scenes } from 'telegraf';
import {
  Command,
  StartCommand,
  HelpCommand,
  CatCommand,
  DogCommand,
  PlacesCommand,
} from './commands';
import { IBotConfig } from '../config/bot.config';
import { PlacesScene } from './scenes/places.scene';
import { IContext } from './context/context.interface';

export class Bot {
  private bot: Telegraf<IContext>;
  private commands: Command[] = [];

  constructor(private readonly BotConfig: IBotConfig) {
    this.bot = new Telegraf(this.BotConfig.BOT_TOKEN);
    this.bot.use(session());
  }

  /**
   * Initialize and start telegram bot.
   */
  start() {
    const stage = new Scenes.Stage<IContext>([PlacesScene]);
    this.bot.use(stage.middleware());

    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new CatCommand(this.bot),
      new DogCommand(this.bot),
      new PlacesCommand(this.bot),
    ];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
