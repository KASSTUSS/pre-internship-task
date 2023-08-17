import { Markup } from 'telegraf';

export const categoriesOfPlacesKeyboard = Markup.keyboard([
  ['Интересные места⛲', 'Отдых😄'],
  ['Спорт🏀', 'Отели🛏️'],
  ['Магазины🛒', 'Еда🍴', 'Банки🏦'],
  ['Выбрать другой город↩️', 'Закрыть❌'],
])
  .resize()
  .oneTime();

export const closePlacesScene = Markup.keyboard([['Закрыть❌']])
  .resize()
  .oneTime();

export const repeatPlacesScene = Markup.keyboard([
    ['Выбрать другую категорию↩️'],
    ['Выбрать другой город↩️'],
    ['Закрыть❌']
])
.resize()
.oneTime();