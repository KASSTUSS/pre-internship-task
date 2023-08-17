import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import {
  SceneContextScene,
  WizardContextWizard,
  WizardSessionData,
} from 'telegraf/typings/scenes';
import { ICoordinates } from '../../types/coordinates.interface';

export interface ISessionData {
    places: {
        cityCoordinates: ICoordinates;
    }
}

export interface IContext extends Context<Update> {
  scene: SceneContextScene<IContext, WizardSessionData>;
  wizard: WizardContextWizard<IContext>;
  sessionData: ISessionData;
}
