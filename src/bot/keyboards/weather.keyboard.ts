import { Markup } from 'telegraf';

export const closePlacesScene = Markup.keyboard([['Закрыть❌']])
  .resize()
  .oneTime();

export const repeatWeatherScene = {
  resize_keyboard: true,
  one_time_keyboard: true,
  keyboard: [
    [{text: 'Выбрать другой город↩️'}],
    [{text: 'Закрыть❌'}],
  ],
};
