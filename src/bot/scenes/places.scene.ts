import { Scenes } from 'telegraf';
import { IContext } from '../context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';
import { PlacesService } from '../../services/places.service';
import { ApiError } from '../../errors/error.class';
import {
  categoriesOfPlacesKeyboard,
  closePlacesScene,
  repeatPlacesScene,
} from '../keyboards/places.keyboard';
import { IPlaceData, IPlaceInformationDataAPI } from '../../types/place.type';
import { CategoriesOfPlacesCommands } from '../../constants/categoriesOfPlaces';
import { ICoordinates } from '../../types/coordinates.interface';

const service = new PlacesService();

let savedCityCoordinates: ICoordinates;

async function sendPlaces(ctx: IContext, places: IPlaceData[]): Promise<void> {
  for (const place of places) {
    const placeInformation: IPlaceInformationDataAPI =
      await service.getInformationAboutPlace(place.properties.xid);

    const address: string =
      placeInformation?.address?.road && placeInformation?.address?.house_number
        ? `🗺️Адрес: ${placeInformation.address.road}, ${placeInformation.address.house_number}`
        : '';

    const message = `➡️ Название: ${placeInformation.name} ⬅️
${address}`;

    await ctx.sendMessage(message);
  }
}
async function sendChooseCategoryOfPlaces(ctx: IContext) {
  await ctx.reply('Выберите категорию мест:', categoriesOfPlacesKeyboard);
  ctx.wizard.selectStep(2);
  return;
}
async function sendCInputCityName(ctx: IContext) {
  await ctx.reply('Введите название города:');
  await ctx.wizard.selectStep(1);
  return;
}

export const PlacesScene = new Scenes.WizardScene<IContext>(
  'PLACES_SCENE',

  async (ctx: IContext) => {
    ctx.reply(
      `Для того чтобы узнать интересные места любого города, введите название города🗺️:`,
    );
    ctx.wizard.next();
  },

  async (ctx: IContext) => {
    const cityName: string | undefined = (ctx.message as Message.TextMessage)
      ?.text;

    if (!cityName) {
      await ctx.replyWithHTML('<b>Вы отправели некорректное сообщение❗</b>');
      await sendCInputCityName(ctx);
      return;
    }

    try {
      savedCityCoordinates = await service.getCoordinatesByCityName(cityName);

      await sendChooseCategoryOfPlaces(ctx);
      return;
    } catch (error) {
      if (error instanceof ApiError && error.name === 'NOT_FOUND') {
        await ctx.replyWithHTML(
          '<b>Такой город не найден, попробуйте ввести другой❗</b>',
        );
        await sendCInputCityName(ctx);
        return;
      }

      await ctx.replyWithHTML(
        '<b>Что-то пошло не так, повторите попытку позже❗</b>',
        closePlacesScene,
      );
      return;
    }
  },

  async (ctx: IContext) => {
    const placeCategory: string | undefined = (
      ctx.message as Message.TextMessage
    )?.text;

    if (!placeCategory) {
      await sendChooseCategoryOfPlaces(ctx);
      return;
    }

    if (placeCategory in CategoriesOfPlacesCommands) {
      const places: IPlaceData[] = await service.getPlacesByCoordinates(
        savedCityCoordinates,
        CategoriesOfPlacesCommands[placeCategory],
      );

      await sendPlaces(ctx, places);
    }

    ctx.sendMessage('Готово!', repeatPlacesScene);
    ctx.wizard.next();

    return;
  },
);

PlacesScene.hears('Закрыть❌', async (ctx: IContext) => {
  await ctx.scene.leave();
  return;
});

PlacesScene.hears('Выбрать другой город↩️', async (ctx: IContext) => {
  await sendCInputCityName(ctx);
  await ctx.wizard.selectStep(1);
  return;
});

PlacesScene.hears('Выбрать другую категорию↩️', async (ctx: IContext) => {
  await sendChooseCategoryOfPlaces(ctx);
  await ctx.wizard.selectStep(2);
  return;
});
