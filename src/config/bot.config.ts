import { ConfigService } from './config.service';

export interface IBotConfig {
  readonly BOT_TOKEN: string;
}

export const BotConfig: IBotConfig = {
  BOT_TOKEN: new ConfigService().get('BOT_TOKEN'),
};
