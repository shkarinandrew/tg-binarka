import { FC, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import GrammerlyIcon from '../../assets/icons/grammerly.svg';
import InformationIcon from '../../assets/icons/information.svg';
import { ChannelContext } from '../../Context/ChannelContext';
import { getRandom } from '../../utils/getRandom';

const randomUsers = getRandom(250, 270);

const Header: FC = () => {
  const [online, setOnline] = useState(randomUsers);
  const context = useContext(ChannelContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(getRandom(250, 270));
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    console.log(context?.invite_link);
  };

  return (
    <div className='w-full text-white text-[10px] flex items-center justify-between'>
      <div className='flex items-center gap-[5px]'>
        <GrammerlyIcon />
        <div>
          {online}{' '}
          <span className='text-[#868686] uppercase'>
            <FormattedMessage id='online' />
          </span>
        </div>
      </div>
      <InformationIcon className='cursor-pointer' onClick={handleClick} />
    </div>
  );
};

export default Header;
