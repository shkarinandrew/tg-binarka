import { FC, memo } from 'react';

import TradingviewChart from '../TradingviewChart';
import ChartHeader from './ChartHeader';

const Chart: FC = () => {
  return (
    <div
      id='chart'
      className='rounded-[10px] overflow-hidden w-full border border-gray text-white'
    >
      <ChartHeader />
      <TradingviewChart />
    </div>
  );
};

export default memo(Chart);
