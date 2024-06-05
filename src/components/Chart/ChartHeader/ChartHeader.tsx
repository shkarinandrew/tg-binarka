import { FC, useEffect, useState } from 'react';

import UsdtIcon from '../../../assets/icons/usdt.svg';
import { IChartHeader } from './ChartHeader.interface';

const ChartHeader: FC<IChartHeader> = ({ count }) => {
  const [animateCount, setAnimateCount] = useState(count);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateCount((prevCount) => {
        if (prevCount === count) {
          clearInterval(timer);
          return count;
        }

        if (prevCount > count) {
          return prevCount - 1;
        }

        return prevCount + 1;
      });
    }, 10); // Регулируйте скорость анимации, изменяя это значение

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className='flex justify-between items-center w-full border-b border-b-gray py-[10px] text-base'>
      <div className='flex justify-center gap-[7px] items-center w-1/2 border-r border-r-gray'>
        <UsdtIcon />
        USDT-BTC
      </div>
      <div className='w-1/2 text-right mr-5'>{animateCount}</div>
    </div>
  );
};

export default ChartHeader;
