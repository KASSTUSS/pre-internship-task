import { ConfigService } from './config.service';

export interface IWeatherAPIConfig {
  readonly WEATHER_APIKEY: string;
}

export const WeatherAPIConfig: IWeatherAPIConfig = {
  WEATHER_APIKEY: new ConfigService().get('WEATHER_APIKEY'),
};
