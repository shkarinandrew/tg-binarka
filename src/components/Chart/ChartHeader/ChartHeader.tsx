import { FC } from 'react';

import UsdtIcon from '../../../assets/icons/usdt.svg';
import { useCount } from '../../../hooks';

const ChartHeader: FC = () => {
  const { count } = useCount();
  // const [animateCount, setAnimateCount] = useState(count);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setAnimateCount((prevCount) => {
  //       if (prevCount === count) {
  //         clearInterval(timer);
  //         return count;
  //       }

  //       if (prevCount > count) {
  //         return prevCount - 1;
  //       }

  //       return prevCount + 1;
  //     });
  //   }, 10); // Регулируйте скорость анимации, изменяя это значение

  //   return () => clearInterval(timer);
  // }, [count]);

  return (
    <div className='flex justify-between items-center w-full border-b border-b-gray py-[10px] text-base sm:text-[19px] md:text-[20px] xl:text-[21px]'>
      <div className='flex justify-center gap-[7px] items-center w-1/2 border-r border-r-gray'>
        <UsdtIcon />
        USDT-BTC
      </div>
      <div className='w-1/2 text-right mr-5'>{count.toFixed(2)}</div>
    </div>
  );
};

export default ChartHeader;
