import { Bot } from './bot/bot';
import { BotConfig } from './config/bot.config';

const bot = new Bot(BotConfig);
bot.start();
