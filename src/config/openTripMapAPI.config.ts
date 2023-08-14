import { ConfigService } from './config.service';

export interface IOpenTripMapAPIConfig {
  readonly openTripMap_TOKEN: string;
}

export const OpenTripMapAPIConfig: IOpenTripMapAPIConfig = {
  openTripMap_TOKEN: new ConfigService().get('OPENTRIPMAP_TOKEN'),
};
