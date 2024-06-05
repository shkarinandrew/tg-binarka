import { FC, useRef } from 'react';

import { useDimensions } from '../../hooks/useDimensions';
import ChartHeader from './ChartHeader';
import LineChart from './LineChart';

interface IChart {
  data: number[];
  count: number;
  start: number;
  end: number;
  isWin: boolean | null;
}

const Chart: FC<IChart> = ({ data, count, start, end, isWin }) => {
  const ref = useRef<HTMLDivElement>(null);
  const height = Math.round((window.innerHeight / 100) * 40);

  const { width } = useDimensions(ref);

  return (
    <div className='rounded-[10px] overflow-hidden w-full border border-gray text-white'>
      <ChartHeader count={count} />
      <div ref={ref}>
        <LineChart
          start={start}
          width={width}
          height={height}
          data={data}
          isWin={isWin}
          end={end}
        />
      </div>
    </div>
  );
};

export default Chart;
