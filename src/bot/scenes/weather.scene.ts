import { Scenes } from 'telegraf';
import { IContext } from '../context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';
import { PlacesService } from '../../services/places.service';
import { WeatherService } from '../../services/weather.service';
import { IWetherDataAPI } from '../../types/weather.type';
import { ICoordinates } from '../../types/coordinates.interface';

const servicePlaces = new PlacesService();
const serviceWeather = new WeatherService();

export const WeatherScene = new Scenes.WizardScene<IContext>(
  'WEATHER_SCENE',

  async (ctx: IContext) => {
    ctx.reply(
      `Чтобы узнать о погоде в вашем городе, отправьте название города или его геопозицию.🗺️`,
    );
    ctx.wizard.next();
    return;
  },

  async (ctx: IContext) => {
    try {
      const cityName: string | undefined = (ctx.message as Message.TextMessage)
        ?.text;
      const sentCityCoordinates: ICoordinates | undefined = (
        ctx.message as Message.LocationMessage
      )?.location;

      if (!sentCityCoordinates && !cityName) {
        ctx.reply(
          'Пожалуйста, введите название города или отправьте его геопозицию.',
        );
        ctx.wizard.selectStep(1);
        return;
      }

      const coordinates: ICoordinates =
        sentCityCoordinates ||
        (await servicePlaces.getCoordinatesByCityName(cityName));
      const weatherData: IWetherDataAPI =
        await serviceWeather.getWeatherInformation(coordinates);

      const message: string = `Погода в ${weatherData.location.name}(${weatherData.location.region}, ${weatherData.location.country})
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
Температура: ${weatherData.current.temp_c} °C
Ветер: ${weatherData.current.wind_mph} м/с
Влажность: ${weatherData.current.humidity}%
--------------------------------------
Последнее обновление: ${weatherData.current.last_updated}`;

      await ctx.replyWithPhoto(
        { url: 'https://' + weatherData.current.condition.icon.slice(2) },
        { caption: message },
      );

      ctx.scene.leave();
      return;
    } catch (error) {
      await ctx.reply('Что-то пошло не так! Повторите попытку позже.');
      await ctx.scene.leave();
      return;
    }
  },
);
