import { Scenes } from 'telegraf';
import { IContext } from '../context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';
import { PlacesService } from '../../services/places.service';
import { WeatherService } from '../../services/weather.service';
import { IWetherDataAPI } from '../../types/weather.type';
import { ICoordinates } from '../../types/coordinates.interface';
import { ApiError } from '../../errors/error.class';
import {
  closeWetherScene,
  repeatWeatherScene,
} from '../keyboards/weather.keyboard';

const servicePlaces = new PlacesService();
const serviceWeather = new WeatherService();

let cityCoordinates: ICoordinates;

async function sendCInputCityName(ctx: IContext) {
  await ctx.reply('Введите название города:');
  await ctx.wizard.selectStep(1);
  return;
}

export const WeatherScene = new Scenes.WizardScene<IContext>(
  'WEATHER_SCENE',

  async (ctx: IContext) => {
    ctx.replyWithHTML(
      `<b>Чтобы узнать о погоде в вашем городе, введите название города🗺️:</b>`,
    );
    ctx.wizard.next();
    return;
  },

  async (ctx: IContext) => {
    const cityName: string | undefined = (ctx.message as Message.TextMessage)
      ?.text;

    if (!cityName) {
      sendCInputCityName(ctx);
      return;
    }

    try {
      cityCoordinates = await servicePlaces.getCoordinatesByCityName(cityName);
      const weatherData: IWetherDataAPI =
        await serviceWeather.getWeatherInformation(cityCoordinates);

      const message: string = `Погода в ${weatherData.location.name}(${weatherData.location.region}, ${weatherData.location.country})
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
Температура: ${weatherData.current.temp_c} °C
Ветер: ${weatherData.current.wind_mph} м/с
Влажность: ${weatherData.current.humidity}%
--------------------------------------
Последнее обновление: ${weatherData.current.last_updated}`;

      await ctx.replyWithPhoto(
        { url: 'https://' + weatherData.current.condition.icon.slice(2) },
        { caption: message, reply_markup: repeatWeatherScene },
      );

      ctx.wizard.next();
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
        closeWetherScene,
      );
      return;
    }
  },
);

WeatherScene.hears('Закрыть❌', async (ctx: IContext) => {
  await ctx.scene.leave();
  return;
});

WeatherScene.hears('Выбрать другой город↩️', async (ctx: IContext) => {
  await sendCInputCityName(ctx);
  await ctx.wizard.selectStep(1);
  return;
});
