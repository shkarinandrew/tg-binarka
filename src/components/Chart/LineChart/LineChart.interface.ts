import { ChartDataType } from '../Chart.interface';

export interface LineChartProps {
  width: number;
  height: number;
  data: ChartDataType[];
  start: number;
  end: number;
  isWin: boolean | null;
}
