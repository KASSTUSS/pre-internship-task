import { ConfigService } from './config.service';

export interface IOpenTripMapAPIConfig {
  readonly openTripMap_APIKEY: string;
}

export const OpenTripMapAPIConfig: IOpenTripMapAPIConfig = {
  openTripMap_APIKEY: new ConfigService().get('OPENTRIPMAP_APIKEY'),
};
