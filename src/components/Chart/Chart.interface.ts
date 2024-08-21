export type ChartDataType = {
  count: number;
  date: number;
};

export interface IChart {
  data: ChartDataType[];
  count: number;
  start: number;
  end: number;
  isWin: boolean | null;
}
