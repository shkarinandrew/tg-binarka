import { FC, useContext, useEffect, useState } from 'react';

import Chart from '../components/Chart';
import Header from '../components/Header';
import Time from '../components/Time';
import { ChannelContext } from '../Context/ChannelContext';
import { getRandom } from '../utils/getRandom';

const { VITE_TIME_SECOND } = import.meta.env;

const HomePage: FC = () => {
  const context = useContext(ChannelContext);

  const [data, setData] = useState<number[]>([getRandom(64980, 65040)]);
  const [time, setTime] = useState(VITE_TIME_SECOND | 5);
  const [start, setStart] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [end, setEnd] = useState(0);

  const count = data.at(-1) || 0;

  const handleSubscribe = () => {
    if (!context?.invite_link) return;

    window.open(context.invite_link, '_blank');
  };

  const handleUpOrDown = () => {
    setDisabled(true);
    setStart(count);
    setIsWin(null);
  };

  useEffect(() => {
    if (!disabled) return;

    if (time < 0) {
      setTime(VITE_TIME_SECOND);
      setDisabled(false);
      setEnd(count);

      if (count > start) {
        setIsWin(true);
      }

      if (count <= start) {
        setIsWin(false);
      }

      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, disabled, count]);

  useEffect(() => {
    const interval = setInterval(() => {
      const generateDataItem = getRandom(64980, 65040);

      setData((prev) => {
        if (prev.length >= 20) {
          prev.shift();
        }
        return [...prev, generateDataItem];
      });
    }, 1_000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className='w-full min-h-screen bg-[#1C1C1D] px-4 pt-5 pb-10 flex flex-col justify-between gap-5'>
      <div className='flex flex-col gap-[10px]'>
        <Header />
        <Chart data={data} count={count} start={start} end={end} isWin={isWin} />
        <Time value={time} />
      </div>
      {/* <div className='w-full flex flex-col gap-[10px]'>
        <Button
          className='w-full bg-purple text-xs font-medium'
          leftIcon={<CupIcon />}
          rightIcon={<CupIcon />}
          onClick={handleSubscribe}
        >
          <FormattedMessage id='subscription_btn' />
        </Button>
        <Balance value={100} />
        <div className='flex items-center gap-[10px] w-full'>
          <Button
            disabled={disabled}
            onClick={handleUpOrDown}
            className='bg-green w-full overflow-hidden text-sm !text-black relative font-semibold py-[9px] rounded-[10px] shadow-btn-green uppercase disabled:bg-green/50 disabled:cursor-not-allowed before:content-[""] before:w-[100px] before:h-[100px] before:bg-[#20FF80] before:z-0 before:absolute before:rotate-45 before:top-[25px] before:rounded-md disabled:before:bg-[#20FF80]/30'
          >
            <div className='z-10'>
              $10 <FormattedMessage id='up_btn' />
            </div>
          </Button>
          <Button
            disabled={disabled}
            onClick={handleUpOrDown}
            className='bg-red w-full overflow-hidden text-sm font-semibold py-[9px] relative rounded-[10px] shadow-btn-red uppercase disabled:bg-red/50 disabled:cursor-not-allowed before:content-[""] before:w-[100px] before:h-[100px] before:bg-[#E75085] before:z-0 before:absolute before:rotate-45 before:bottom-[25px] before:rounded-md disabled:before:bg-[#E75085]/30'
          >
            <div className='z-10'>
              $10 <FormattedMessage id='down_btn' />
            </div>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
