import { useInitData, useUtils } from '@tma.js/sdk-react';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CupIcon from '../assets/icons/cup.svg';
import Balance from '../components/Balance';
import Button from '../components/Button';
import Chart from '../components/Chart';
import Header from '../components/Header';
import Time from '../components/Time';
import { ChannelContext } from '../context/ChannelContext';
import { SubscribeContext } from '../context/SubscribeContext';
import { useCount, useGame } from '../hooks';
import { checkSubscription } from '../services/checkSubscription';
import { gameResult } from '../services/gameResult';
import { UserProfileType } from '../services/getUserProfile';
import { findBotUsername } from '../utils/findBotUsername';

type ButtonToggleType = 'up' | 'down';
interface IHomePage {
  userProfile: UserProfileType;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const { VITE_TIME_SECOND, VITE_COUNT_WIN_OR_LOSE } = import.meta.env;
const defaultCount = parseInt(VITE_COUNT_WIN_OR_LOSE, 10) || 10;
const defaultTime = parseInt(VITE_TIME_SECOND, 10) || 5;

const HomePage: FC<IHomePage> = ({ userProfile, setCount }) => {
  const context = useContext(ChannelContext);
  const contextSubscribe = useContext(SubscribeContext);
  const { count } = useCount();
  const { end, start, updateEnd, updateStart } = useGame();

  const initData = useInitData();
  const utils = useUtils();

  const userId = initData?.user?.id.toString();

  const [time, setTime] = useState<number>(defaultTime);
  const [disabled, setDisabled] = useState(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [type, setType] = useState<ButtonToggleType>();
  const [balance, setBalance] = useState(userProfile?.balance || 0);

  const botUsername = findBotUsername();

  const handleSubscribe = () => {
    if (!context?.invite_link) return;

    utils.openTelegramLink(context.invite_link);
  };

  const handleUpOrDown = (toggle: ButtonToggleType) => {
    setDisabled(true);
    updateStart(count);
    setIsWin(null);
    updateEnd(0);
    setType(toggle);
  };

  const winOrLoseUpdate = useCallback(
    (toggle: boolean) => {
      const countWinOrLose = toggle ? defaultCount : -defaultCount;

      setIsWin(toggle);
      setBalance((prev) => prev + countWinOrLose);

      setCount((prev) => prev + 1);
      const gameCount = parseInt(localStorage.getItem('gameCount') || '0', 10);
      localStorage.setItem('gameCount', (gameCount + 1).toString());

      if (!userId || !botUsername) return;

      const isWin = toggle ? 'true' : 'false';

      gameResult(userId, botUsername, isWin, defaultCount).then(() => {
        checkSubscription(userId, botUsername).then(({ result }) => {
          contextSubscribe.setIsSubscribe(result);
        });
      });
    },
    [userId, botUsername],
  );

  useEffect(() => {
    if (!disabled) return;

    if (time < 0) {
      setTime(defaultTime);
      setDisabled(false);
      updateEnd(count);

      if ((type === 'up' && count > start) || (type === 'down' && count <= start)) {
        return winOrLoseUpdate(true);
      }

      if ((type === 'up' && count <= start) || (type === 'down' && count > start)) {
        return winOrLoseUpdate(false);
      }
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [disabled, time, winOrLoseUpdate]);

  return (
    <div
      className='w-full bg-[#1C1C1D] px-4 pt-5 pb-10 flex flex-col h-screen gap-5 overflow-y-auto'
      style={{
        overscrollBehavior: 'none',
      }}
    >
      <div className='flex flex-col gap-[10px]'>
        <Header />
        <Chart />
        <Time value={time} />
      </div>

      <div className='w-full flex flex-col h-full gap-[10px] justify-center'>
        <Button
          className='w-full bg-purple text-xs sm:text-[13px] md:text-[14px] font-medium'
          leftIcon={<CupIcon />}
          rightIcon={<CupIcon />}
          onClick={handleSubscribe}
        >
          <FormattedMessage id='subscription_btn' />
        </Button>
        <Balance
          isDisabled={disabled}
          value={balance}
          isWin={isWin}
          setBalance={setBalance}
        />
        <div className='flex flex-col px-2 pb-3 pt-1.5 rounded-xl border border-[#464646] gap-1.5'>
          <div className='uppercase text-xs leading-none text-[#BEBEBE] text-center'>
            ↓ <FormattedMessage id='make_bet' /> ↓
          </div>
          <div className='flex items-center gap-[10px] w-full'>
            <Button
              disabled={disabled}
              onClick={() => handleUpOrDown('up')}
              className='bg-green w-full overflow-hidden text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] !text-black relative font-semibold py-[9px] sm:py-[11px] lg:py-[12px] rounded-[10px] shadow-btn-green uppercase disabled:bg-green/50 disabled:cursor-not-allowed before:content-[""] before:w-[100px] before:h-[100px] before:bg-[#20FF80] before:z-0 before:absolute before:rotate-45 before:top-[25px] before:rounded-md disabled:before:bg-[#20FF80]/30'
            >
              <div className='z-10'>
                ${defaultCount} <FormattedMessage id='up_btn' />
              </div>
            </Button>
            <Button
              disabled={disabled}
              onClick={() => handleUpOrDown('down')}
              className='bg-red w-full overflow-hidden text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold py-[9px] sm:py-[11px] lg:py-[12px] relative rounded-[10px] shadow-btn-red uppercase disabled:bg-red/50 disabled:cursor-not-allowed before:content-[""] before:w-[100px] before:h-[100px] before:bg-[#E75085] before:z-0 before:absolute before:rotate-45 before:bottom-[25px] before:rounded-md disabled:before:bg-[#E75085]/30'
            >
              <div className='z-10'>
                ${defaultCount} <FormattedMessage id='down_btn' />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
