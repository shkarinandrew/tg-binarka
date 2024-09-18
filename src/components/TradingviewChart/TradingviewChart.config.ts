import { CreatePriceLineOptions } from 'lightweight-charts';

export const DEFAULT_OPTIONS_LINE: Pick<
  CreatePriceLineOptions,
  'lineWidth' | 'lineStyle' | 'axisLabelVisible'
> = {
  lineWidth: 2,
  lineStyle: 2, // LineStyle.Dashed
  axisLabelVisible: true,
};
