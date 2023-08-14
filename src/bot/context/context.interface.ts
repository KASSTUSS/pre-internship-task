import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import {
  SceneContextScene,
  WizardContextWizard,
  WizardSessionData,
} from 'telegraf/typings/scenes';

export interface IContext extends Context<Update> {
  scene: SceneContextScene<IContext, WizardSessionData>;
  wizard: WizardContextWizard<IContext>;
}
