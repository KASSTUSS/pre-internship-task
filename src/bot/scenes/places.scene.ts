import { Scenes } from 'telegraf';
import { IContext } from '../context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';
import { CityCoordinates } from '../../services/places.service';
import { PlacesService } from '../../services/places.service';
import { IPlaceData, IPlaceInformationDataAPI } from '../../types/place.type';

const service = new PlacesService();

async function sendPlaces(ctx: IContext, places: IPlaceData[]): Promise<void> {
  for (const place of places) {
    const placeInformation: IPlaceInformationDataAPI =
      await service.getInformationAboutPlace(place.properties.xid);

    const address: string =
      placeInformation?.address?.road && placeInformation?.address?.house_number
        ? `🗺️Адрес: ${placeInformation.address.road}, ${placeInformation.address.house_number}`
        : '';

    const message = `➡️ Название: ${placeInformation.name} ⬅️
${address}

ГЕОПОЗИЦИЯ ДАННОГО МЕСТА
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️`;

    
    await ctx.reply(message);

    await ctx.replyWithLocation(
      placeInformation.point.lat,
      placeInformation.point.lon,
    );
  }
}

export const PlacesScene = new Scenes.WizardScene<IContext>(
  'PLACES_SCENE',

  async (ctx: IContext) => {
    ctx.reply(
      `Чтобы узнать об интересных местах в вашем городе, отправьте название города или его геопозицию.🗺️`,
    );
    ctx.wizard.next();
    return;
  },

  async (ctx: IContext) => {
    const cityName: string | undefined = (ctx.message as Message.TextMessage)
      ?.text;
    const sentCityCoordinates: CityCoordinates | undefined = (
      ctx.message as Message.LocationMessage
    )?.location;

    if (!sentCityCoordinates && !cityName) {
      ctx.reply(
        'Пожалуйста, введите название города или отправьте его геопозицию.',
      );
      ctx.wizard.selectStep(1);
      return;
    }

    if (sentCityCoordinates) {
      sendPlaces(
        ctx,
        await service.getPlacesByCoordinates(sentCityCoordinates),
      );
      ctx.scene.leave();
      return;
    }

    const cityCoordinates: CityCoordinates =
      await service.getGeopositionByCityName(cityName);
    sendPlaces(ctx, await service.getPlacesByCoordinates(cityCoordinates));

    ctx.scene.leave();
    return;
  },
);
