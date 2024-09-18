import { UTCTimestamp } from 'lightweight-charts';

import { START_RANDOM } from '../config';

export const generateTradingviewChartDataItem = (
  time: UTCTimestamp,
  prevClose?: number,
) => {
  const open = prevClose ? prevClose : Math.random() * 50 + START_RANDOM; // Случайная цена открытия в диапазоне 64980-65030
  const high = open + (Math.random() * 10 + 5); // Случайный максимум
  const low = open - (Math.random() * 10 + 5); // Случайный минимум
  const close = open + (Math.random() * 10 - 5); // Случайная цена закрытия

  return {
    time,
    open,
    high,
    low,
    close,
  };
};
